import React, { memo } from "react";
import { Link } from "react-router-dom";

import Logo from "../../../UI/JS/logo";
import NavigationItems from "./navigation_items";
import { Hamburger } from "../../../UI/JS/icons";
import SearchProductInput from "../../../../containers/Homepage/JS/search_product_form";

import styles from "../../CSS/Toolbar/top_toolbar.module.css";

const toolbar = props => (
	<header className={styles.Toolbar}>
		<Logo />
		<SearchProductInput />
		{localStorage.length === 0 ||
		!localStorage.userData ||
		(localStorage.fbLoggedIn === "false" &&
			Date.now() > localStorage.expiresIn) ? (
			<nav className={styles.nav}>
				<NavigationItems horizontal={true}>
					{props.children}
				</NavigationItems>
			</nav>
		) : null}
		{localStorage.length === 0 ||
		!localStorage.userData ||
		(localStorage.fbLoggedIn === "false" &&
			Date.now() > localStorage.expiresIn) ? (
			<i className={styles.icon}>
				<Hamburger
					HamStyle={styles.HamStyle}
					hamBarStyle={styles.hamBarStyle}
					onClick={props.hamburgerClick}
				/>
			</i>
		) : (
			<Link className={styles.user_icon} to="/profile">
				<i className="fas fa-user" />
				<span className={styles.username}>
					{JSON.parse(localStorage.userData).name.split(" ")[0]}
				</span>
			</Link>
		)}
	</header>
);

export default memo(toolbar);
