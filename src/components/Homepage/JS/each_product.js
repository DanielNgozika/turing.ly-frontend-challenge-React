import React, { memo } from "react";

//components
import Modal from "../../UI/JS/modal";
import Attribute from "../../../containers/Homepage/JS/attribute";

//style
import styles from "../CSS/each_product.module.css";

const eachProduct = props => {
	const {
		product,
		clicked,
		productDetailed,
		showAttrModal,
		attrModalOpen
	} = props;

	const url = "https://backendapi.turing.com/images/products/";

	const attrModal = (
		<Modal styles={styles.attributeModal}>
			<Attribute />
		</Modal>
	);

	const productDetailedModal = (
		<Modal styles={styles.prodDetailModal}>
			<div className={styles.top}>
				<img src={url + product.thumbnail} alt={product.name} />
				<span>
					<p className={styles.name}>{product.name}</p>
					<span className={styles.mod_price}>$ {product.price}</span>
					<span className={styles.disc_price}>
						$ {product.discounted_price}
					</span>
				</span>
			</div>
			<p className={styles.descr}>{product.description}</p>
			<button
				type="button"
				onClick={() => showAttrModal(product.product_id)}
			>
				Add to cart
			</button>
		</Modal>
	);

	return (
		<>
			<div
				className={styles.div}
				onClick={() => clicked(product.product_id)}
			>
				<img src={url + product.thumbnail} alt={product.name} />
				<p className={styles.price}>$ {product.discounted_price}</p>
				<p className={styles.name}>{product.name}</p>
			</div>
			{productDetailed === product.product_id
				? productDetailedModal
				: null}
			{attrModalOpen === product.product_id ? attrModal : null}
		</>
	);
};

export default memo(eachProduct);
