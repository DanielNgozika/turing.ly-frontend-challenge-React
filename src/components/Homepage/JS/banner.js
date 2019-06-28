import React from "react";

import backImg from "../../../assets/shirts.jpg";

//style
import styles from "../CSS/banner.module.css";

const banner = () => {
	const styling = {
		backgroundImage: `url(${backImg})`
	};
	return (
		<div className={styles.banner}>
			<div style={styling} className={styles.back_photo} />
			<h1>
				Best Shirts <br />
				Best Prices
			</h1>
		</div>
	);
};

export default banner;
