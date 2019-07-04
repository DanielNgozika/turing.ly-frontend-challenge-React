import React from "react";

import styles from "../CSS/icons.module.css";

export const Ellipses = props => {
	return (
		<div
			className={
				props.vertical
					? styles.ellipsesVertical
					: styles.ellipsesHorizontal
			}
			onClick={props.onClick}
		>
			<div className={styles.dots} />
			<div className={styles.dots} />
			<div className={styles.dots} />
		</div>
	);
};

export const Hamburger = props => {
	return (
		<div className={props.HamStyle} onClick={() => props.onClick()}>
			<div className={props.hamBarStyle} />
			<div className={props.hamBarStyle} />
			<div className={props.hamBarStyle} />
		</div>
	);
};

export const CategoryIcon = props => {
	return (
		<div className={styles.CategoryIcon}>
			<div className={styles.catBar1} />
			<div className={styles.catBar2} />
			<div className={styles.catBar3} />
			<div className={styles.catBar4} />
		</div>
	);
};
