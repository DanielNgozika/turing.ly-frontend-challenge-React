import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./checkout_form";

class CheckoutFormContainer extends Component {
	render() {
		const { orderId, amount } = this.props;
		return (
			<StripeProvider apiKey="pk_test_UKg2JJbjbjlHYzQWZmtnJDB100NDilPkVF">
				<Elements>
					<CheckoutForm orderId={orderId} amount={amount} />
				</Elements>
			</StripeProvider>
		);
	}
}

export default CheckoutFormContainer;
