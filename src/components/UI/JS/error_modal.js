import React, { memo } from "react";

//styles
import styles from "../CSS/error_modal.module.css";

const errorModal = props => {
	const { show, message } = props;
	return (
		<div
			className={
				show
					? [styles.div, styles.divShow].join(" ")
					: [styles.div, styles.divHide].join(" ")
			}
		>
			<p>{message}</p>
		</div>
	);
};

export default memo(errorModal);
