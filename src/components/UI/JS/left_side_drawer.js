import React from "react";

import classes from "../CSS/left_side_drawer.module.css";

const sideDrawer = props => (
	<div
		onClick={() => props.onClick()}
		className={
			props.open
				? [classes.leftSideDrawer, classes.leftSideDrawerOpen].join(" ")
				: [classes.leftSideDrawer, classes.leftSideDrawerClose].join(
						" "
				  )
		}
	>
		{props.children}
	</div>
);

export default sideDrawer;
