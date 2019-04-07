import React from 'react';

import classes from '../../CSS/Toolbar/navigation_items.module.css';

const navigationItems = props => (
	<ul className={props.horizontal ? classes.Ul_horizontal : classes.Ul_vertical}>
		{props.children}
	</ul>
)

export default navigationItems;