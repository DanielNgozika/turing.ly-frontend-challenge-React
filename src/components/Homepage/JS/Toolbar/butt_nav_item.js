import React from "react";

import classes from "../../CSS/Toolbar/butt_nav_item.module.css";

const buttNavItem = props => {
	return (
		<li className={classes.buttNavItem} onClick={() => props.onClick()}>
			{props.icon}
			{props.buttName ? <p>{props.buttName}</p> : null}
		</li>
	);
};

export default buttNavItem;
