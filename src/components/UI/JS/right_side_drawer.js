import React from "react";

//style
import classes from "../CSS/right_side_drawer.module.css";

const sideDrawer = props => (
	<div
		onClick={() => props.onClick()}
		className={
			props.open
				? [classes.rightSideDrawer, classes.rightSideDrawerOpen].join(
						" "
				  )
				: [classes.rightSideDrawer, classes.rightSideDrawerClose].join(
						" "
				  )
		}
	>
		{props.children}
	</div>
);

export default sideDrawer;
