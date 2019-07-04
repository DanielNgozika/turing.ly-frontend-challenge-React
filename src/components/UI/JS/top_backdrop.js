import React from "react";

//style
import styles from "../CSS/top_backdrop.module.css";

const topBackdrop = props => {
	return (
		<div className={styles.topBackdrop} onClick={() => props.onClick()} />
	);
};

export default topBackdrop;
