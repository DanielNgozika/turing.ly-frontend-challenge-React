import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

//styles
import styles from "../CSS/attribute_input.module.css";

//component
import { renderInputField } from "../../../components/UI/JS/forms";

//actions
import { addToCart, clickBackDrop } from "../../../actions/general/index";

class AttributeInput extends Component {
	submit = e => {
		const { addToCart, cartId, productId, clickBackDrop } = this.props;
		addToCart(cartId, productId, e);
		clickBackDrop();
	};
	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(e => this.submit(e))}
				className={styles.form}
			>
				<Field
					name="attributes"
					text="text"
					className={styles.input}
					component={renderInputField}
					autoFocus
					placeholder="eg: color, size"
				/>
				<button type="submit">
					<i className="fas fa-check" />
				</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {
		productId: state.general.productIdAttrModalOpen,
		cartId: state.general.cartId
	};
}

const mapDispatchToProps = dispatch => ({
	addToCart: (...args) => addToCart(dispatch, ...args),
	clickBackDrop: () => dispatch(clickBackDrop())
});

export default reduxForm({
	form: "attribute form"
})(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(AttributeInput)
);
