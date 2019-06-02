import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { renderInputField } from "../../../components/UI/JS/forms";

//styles
import styles from "../CSS/edit_cart_item_form.module.css";

//actions
import {
	updateCartItem,
	removeCartitemEditForm
} from "../../../actions/general/index";

class EditCartItemForm extends Component {
	submit = e => {
		const { itemId, removeCartitemEditForm } = this.props;
		this.props.updateCartItem(itemId, e.new_quantity);
		removeCartitemEditForm();
	};

	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(e => this.submit(e))}
				className={styles.form}
			>
				<Field
					name="new_quantity"
					type="number"
					component={renderInputField}
					placeholder="enter new quantity"
					className={styles.input}
					autoFocus
				/>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	itemId: state.general.cartItemIdUpdated
});

const mapDispatchToProps = dispatch => ({
	updateCartItem: (...args) => updateCartItem(dispatch, ...args),
	removeCartitemEditForm: () => dispatch(removeCartitemEditForm())
});

export default reduxForm({
	form: "cart item edit form"
})(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(EditCartItemForm)
);
