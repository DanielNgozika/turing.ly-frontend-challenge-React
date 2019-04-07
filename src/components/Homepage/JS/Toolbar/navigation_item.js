import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from '../../CSS/Toolbar/navigation_item.module.css';

const navigationItem = (props) => {
	return (
		<li className={classes.NavigationItem}>
			<NavLink to={props.to} activeClassName={classes.Active}><span>{props.itemName}</span></NavLink>
		</li>
	)
}

export default navigationItem;