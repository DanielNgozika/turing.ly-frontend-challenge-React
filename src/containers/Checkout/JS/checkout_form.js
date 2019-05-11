import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

//styles
import styles from "../CSS/checkout_form.module.css";

//Component
import DescriptionForm from "./description_form";

//actions
import { clickBackDrop } from "../../../actions/general/index";

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
				this.props.removeModal()
				this.props.history.push("/");
			}, 2700);
		}

		if (this.state.error.status === true)
			setTimeout(() => this.props.removeModal(), 2700);
	}

	submit = async ev => {
		// User clicked submit
		const { describeFormState, orderId, amount } = this.props;
		const userDescription =
			describeFormState && describeFormState.values
				? describeFormState.values.description
				: null;
		let { token } = await this.props.stripe.createToken({ name: "Name" });
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
				}&order_id=${orderId}&description=${userDescription}&amount=${parseFloat(
					amount
				)}`
			}
		);

		if (response.ok) {
			this.setState({ completed: true });
			console.log(response);
		} else {
			this.setState({
				error: { status: true, message: response.statusText }
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
					<p className={styles.error}>Something went wrong.</p>
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
	removeModal: () => dispatch(clickBackDrop())
});

const mapStateToProps = state => ({
	describeFormState: state.form.description_form
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(injectStripe(CheckoutForm)));
