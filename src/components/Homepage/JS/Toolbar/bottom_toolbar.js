import React from 'react';

import NavigationItems from './navigation_items';

import classes from '../../CSS/Toolbar/bottom_toolbar.module.css';

const buttToolBar = (props) => (
	<div className={classes.ButtToolBar}>
		<NavigationItems horizontal={true}>
			{props.children}
		</NavigationItems>
	</div>
)

export default buttToolBar;