import React from "react";

import styles from "../CSS/modal.module.css";

const modal = props => (
	<div id={styles.modal} className={props.styles}>
		{props.children}
	</div>
);

export default modal;
