import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//styles
import styles from "../CSS/checkout_form.module.css";

//Component
import DescriptionForm from "./description_form";

//actions
import { clickBackDrop, emptyCart } from "../../../actions/general/index";

class CheckoutForm extends Component {
	state = {
		completed: false,
		error: {
			status: false,
			message: null
		}
	};

	componentDidUpdate() {
		if (this.state.completed === true) {
			setTimeout(() => {
				this.props.clickBackDrop();
				this.props.history.push("/");
			}, 2700);
		}

		if (this.state.error.status === true)
			setTimeout(() => this.props.clickBackDrop(), 3700);
	}

	submit = async ev => {
		// User clicked submit
		const { describeFormState, orderId, amount } = this.props;
		const userDescription =
			describeFormState && describeFormState.values
				? describeFormState.values.description
				: null;
		let { token } = await this.props.stripe.createToken({ name: "Name" });
		if (!token) {
			this.setState({
				error: { status: true, message: "Something is wrong" }
			});
			return;
		}
		let response = await fetch(
			"https://backendapi.turing.com/stripe/charge",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body: `stripeToken=${
					token.id
				}&order_id=${orderId}&description=${userDescription}&amount=${parseInt(
					amount * 100
				)}`
			}
		);

		if (response.ok) {
			this.props.emptyCart(this.props.cartId);
			this.setState({ completed: true });
		} else {
			const error = await response.json();
			this.setState({
				error: { status: true, message: error.error.message }
			});
		}
	};

	render() {
		if (this.state.error.status)
			return (
				<>
					<span className={styles.error_div}>
						<i className="fas fa-exclamation-triangle" />
					</span>
					<p className={styles.error}>{this.state.error.message}.</p>
				</>
			);
		if (this.state.completed)
			return (
				<>
					<span className={styles.success_div}>
						<i className="far fa-check-circle" />
					</span>
					<p className={styles.success}>Payment successful</p>
				</>
			);
		return (
			<div className={styles.div}>
				<p>Complete purchase</p>
				<DescriptionForm />
				<CardElement />
				<button onClick={this.submit}>Pay</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	clickBackDrop: () => dispatch(clickBackDrop()),
	emptyCart: cartId => emptyCart(dispatch, cartId)
});

const mapStateToProps = state => ({
	describeFormState: state.form.description_form,
	cartId: state.general.cartId
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(injectStripe(CheckoutForm)));
