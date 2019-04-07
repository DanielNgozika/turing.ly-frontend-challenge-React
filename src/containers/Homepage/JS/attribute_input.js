import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//styles
import styles from "../CSS/attribute_input.module.css";

//component
import { renderInputField } from "../../../components/UI/JS/forms";

//actions
import { addToCart, clickBackDrop } from "../../../actions/general/index";

class AttributeInput extends Component {
	submit = e => {
		this.props.addToCart(this.props.cartId, this.props.productId, e);
		this.props.clickBackDrop();
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			addToCart,
			clickBackDrop
		},
		dispatch
	);
}

export default reduxForm({
	form: "attribute form"
})(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(AttributeInput)
);
