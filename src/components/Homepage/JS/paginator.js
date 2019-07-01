import React, { memo } from "react";

import styles from "../CSS/paginator.module.css";

const Paginator = ({ page, nextPage, prevPage, nosOfProducts }) => (
	<div className={styles.div}>
		<button onClick={() => prevPage()} disabled={page === 1 ? true : false}>
			<i className="fas fa-chevron-left" />
		</button>
		<span>{page}</span>
		<button
			onClick={() => nextPage()}
			disabled={nosOfProducts < 20 ? true : false}
		>
			<i className="fas fa-chevron-right" />
		</button>
	</div>
);

export default memo(Paginator);
