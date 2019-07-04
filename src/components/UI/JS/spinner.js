import React from "react";

import styles from "../CSS/spinner.module.css";

const spinner = ({ id }) => {
	return (
		<div className={styles.lds_ripple} id={id}>
			<div />
			<div />
		</div>
	);
};

export default spinner;
