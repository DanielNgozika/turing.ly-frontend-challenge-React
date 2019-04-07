import React from 'react';

import classes from '../../CSS/Toolbar/butt_nav_item.module.css';

const buttNavItem = (props) => {
	return (
		<li className={classes.buttNavItem} onClick={() => props.onClick()}>
			{props.icon}
			<p>{props.buttName}</p>
		</li>
	)
}

export default buttNavItem;