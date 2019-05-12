import React from "react";

import Logo from "../../../UI/JS/logo";
import NavigationItems from "./navigation_items";
import { Hamburger } from "../../../UI/JS/icons";
import SearchProductInput from "../../../../containers/Homepage/JS/search_product_form";

import styles from "../../CSS/Toolbar/top_toolbar.module.css";

const toolbar = props => (
	<header className={styles.Toolbar}>
		<Logo />
		<SearchProductInput />
		<nav className={styles.nav}>
			<NavigationItems>{props.children}</NavigationItems>
		</nav>
		{localStorage.length === 0 ||
		(Date.now() > localStorage.expiresIn && !localStorage.fbLoggedIn) ? (
			<i className={styles.icon}>
				<Hamburger
					HamStyle={styles.HamStyle}
					hamBarStyle={styles.hamBarStyle}
					onClick={props.hamburgerClick}
				/>
			</i>
		) : null}
	</header>
);

export default toolbar;
