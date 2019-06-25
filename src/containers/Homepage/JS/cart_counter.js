import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//styles
import styles from "../CSS/cart_counter.module.css";

class CartCounter extends PureComponent {
	render() {
		return (
			<div
				className={styles.div}
				onClick={() => this.props.history.push("/cart")}
			>
				<div className={styles.counter}>
					{this.props.itemsCount.length}
				</div>
				<i className="fas fa-shopping-basket" />
			</div>
		);
	}
}

function mapstateToProps(state) {
	return {
		itemsCount: state.general.cart
	};
}

export default connect(
	mapstateToProps,
	null
)(withRouter(CartCounter));
