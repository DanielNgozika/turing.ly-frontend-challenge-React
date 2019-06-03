import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./checkout_form";

class CheckoutFormContainer extends Component {
	render() {
		const { orderId, amount } = this.props;
		const totalAmount = amount();
		return (
			<StripeProvider apiKey="pk_test_NcwpaplBCuTL6I0THD44heRe">
				<Elements>
					<CheckoutForm orderId={orderId} amount={totalAmount} />
				</Elements>
			</StripeProvider>
		);
	}
}

export default CheckoutFormContainer;
