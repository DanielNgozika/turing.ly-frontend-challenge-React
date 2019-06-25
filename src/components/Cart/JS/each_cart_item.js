import React, { memo } from "react";

//COMPONENTS
import Modal from "../../UI/JS/modal";
import EditCartItemForm from "../../../containers/Cart/JS/edit_cart_item_form";
import Backdrop from "../../UI/JS/top_backdrop";

import styles from "../CSS/each_cart_item.module.css";

const eachOrder = props => {
	const { name, attributes, item_id, price, quantity, subtotal } = props.item;
	const {
		removeItem,
		showUpdateForm,
		itemUpdated,
		showRemoveModal,
		removeModalOpen,
		cancelRemoval,
		backdrop,
		clickBackdrop
	} = props;
	const qty = (
		<div className={styles.qty_div}>
			<span className={styles.qty}>quantity: {quantity}</span>
			<span
				className={styles.change}
				onClick={() => showUpdateForm(item_id)}
			>
				change
			</span>
		</div>
	);
	const removeModal = (
		<Modal styles={styles.remove_notice}>
			<p>Are you sure you want to remove this item from the cart?</p>
			<button onClick={() => removeItem(item_id)}>yes, sure.</button>
			<button onClick={() => cancelRemoval()}>No, was a mistake.</button>
		</Modal>
	);
	return (
		<div className={styles.item}>
			<div className={styles.top}>
				<div className={styles.name}>{name}</div>
				<span
					className={styles.remove}
					onClick={() => showRemoveModal(item_id)}
				>
					&times;
				</span>
			</div>
			<div className={styles.price}>$ {price}</div>
			{itemUpdated === item_id ? <EditCartItemForm /> : qty}
			<div className={styles.attribute}>{attributes}</div>
			<hr className={styles.hr} />
			<div className={styles.subTotal}>
				<span>SubTotal:</span>
				<span>$ {parseFloat(subtotal).toFixed(2)}</span>
			</div>
			{removeModalOpen === item_id ? removeModal : null}
			{backdrop ? <Backdrop onClick={clickBackdrop} /> : null}
		</div>
	);
};

export default memo(eachOrder);
