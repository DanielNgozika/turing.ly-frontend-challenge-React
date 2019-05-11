import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//styles
import styles from "../CSS/cart_page.module.css";

//actions
import {
	emptyCart,
	removeCartItem,
	showCartItemUpdateForm,
	showRemoveNoticeModal,
	clickBackDrop,
	showEmptyCartWarning,
	showCheckoutModal
} from "../../../actions/general/index";

//components
import EachCartItem from "../../../components/Cart/JS/each_cart_item";
import Modal from "../../../components/UI/JS/modal";
import Backdrop from "../../../components/UI/JS/top_backdrop";
import RegionSelect from "./region_select";
import ShippingType from "./shipping _type_select";
import CheckoutFormContainer from "../../Checkout/JS/checkout_form_container";
import Spinner from "../../../components/UI/JS/spinner";

class CartPage extends Component {
	state = {
		totalAmount: this.props.cart
			.map(i => parseFloat(i.subtotal))
			.reduce((a, b) => a + b, 0)
			.toFixed(2),
		orderId: null,
		orderIdLoading: false
	};

	componentDidMount() {
		//ToHandleLater: on cartpage reload,
		//throw a "something went wrong" and
		//redirect to homepage because cartId will be null
	}

	id = [];

	emptyCartFunc = () => {
		this.props.emptyCart(this.props.cartId);
		this.props.clickBackDrop();
	};

	createOrder = () => {
		if (localStorage.length === 0) this.props.history.push("./sign_up");
		else if (Date.now() > localStorage.expiresIn)
			this.props.history.push("/sign_in");
		else if (this.state.orderId) this.props.showCheckoutModal();
		else {
			this.setState({ orderIdLoading: true });
			this.props.showCheckoutModal();
			const token = localStorage.accessToken;
			const shippingId = this.id[0][0].shipping_id;
			const cartId = this.props.cartId;
			fetch("https://backendapi.turing.com/orders", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded",
					"User-Key": token
				},
				body: `cart_id=${cartId}&shipping_id=${shippingId}&tax_id=2`
			})
				.then(res => {
					if (!res.ok) throw Error("Something went wrong");
					return res.json();
				})
				.then(data =>
					this.setState({
						orderId: data.orderId,
						orderIdLoading: false
					})
				)
				.catch(err => console.log(err));
		}
	};

	render() {
		const {
			cart,
			history,
			showEmptyCartWarning,
			warningModal,
			backdropVisible,
			clickBackDrop,
			regionValue,
			regions,
			allShippingTypes,
			shippingTypeSelect,
			checkoutModalShowing
		} = this.props;

		const getShippingId = () => {
			if (
				shippingTypeSelect &&
				shippingTypeSelect.values &&
				shippingTypeSelect.values.shipping_type !==
					"select shipping type"
			)
				this.id = regions
					.map(reg => reg.shipping_region_id)
					.filter(each => each !== 1)
					.map(i =>
						allShippingTypes[i].filter(st =>
							st.shipping_type ===
							shippingTypeSelect.values.shipping_type
								? st.shipping_id
								: null
						)
					)
					.filter(t => t.length > 0);
			else console.log("unavailable");
		};

		const areYouSureModal = (
			<Modal styles={styles.warning_modal}>
				<p>All cart items will be removed</p>
				<button onClick={() => this.emptyCartFunc()}>continue</button>
				<button onClick={() => clickBackDrop()}>cancel</button>
			</Modal>
		);

		const checkoutModal = (
			<Modal styles={styles.checkout_modal}>
				{this.state.orderIdLoading ? (
					<Spinner />
				) : (
					<CheckoutFormContainer
						orderId={this.state.orderId}
						amount={this.state.totalAmount}
					/>
				)}
			</Modal>
		);

		const isTruthy =
			(regionValue &&
				regionValue.values &&
				regionValue.values.select_shipping_region ===
					"Please Select") ||
			(shippingTypeSelect &&
				shippingTypeSelect.values &&
				shippingTypeSelect.values.shipping_type ===
					"select shipping type")
				? true
				: false;

		const showCart = () => {
			if (cart.length === 0) return <p>Cart empty</p>;
			else
				return (
					<div className={styles.items}>
						{cart.map(item => (
							<EachCartItem
								key={item.item_id}
								item={item}
								removeItem={this.props.removeCartItem}
								showUpdateForm={
									this.props.showCartItemUpdateForm
								}
								itemUpdated={this.props.itemUpdated}
								showRemoveModal={
									this.props.showRemoveNoticeModal
								}
								removeModalOpen={this.props.removalModal}
								cancelRemoval={this.props.clickBackDrop}
								backdrop={backdropVisible}
								clickBackdrop={clickBackDrop}
							/>
						))}
						<hr className={styles.items_hr} />
						<div className={styles.total_div}>
							<span>Total:</span>
							<span>$ {this.state.totalAmount}</span>
						</div>
						<h3>Shipping Region</h3>
						<RegionSelect />
						<h3>Shipping Type</h3>
						<ShippingType />
						<button
							className={styles.order}
							disabled={isTruthy}
							onClick={this.createOrder}
						>
							Create order
						</button>
					</div>
				);
		};
		return (
			<>
				<header className={styles.header}>
					<i
						className="fas fa-arrow-left"
						onClick={() => history.go(-1)}
					/>
					<span>CART</span>
					<i
						className="fas fa-shopping-basket"
						onClick={() => showEmptyCartWarning()}
					/>
				</header>
				{showCart()}
				{backdropVisible ? (
					<Backdrop onClick={() => clickBackDrop()} />
				) : null}
				{warningModal ? areYouSureModal : null}
				{getShippingId()}
				{checkoutModalShowing ? checkoutModal : null}
			</>
		);
	}
}

const mapStateToProps = state => ({
	cartId: state.general.cartId,
	cart: state.general.cart,
	itemUpdated: state.general.cartItemIdUpdated,
	backdropVisible: state.general.backdropVisible,
	removalModal: state.general.itemRemoveNoticeModalOpen,
	warningModal: state.general.emptyCartWarningModal,
	regions: state.general.shippingRegions,
	regionValue: state.form.region_select_field,
	allShippingTypes: state.general.shippingTypesPerRegion,
	shippingTypeSelect: state.form.shipping_type_select_field,
	checkoutModalShowing: state.general.checkoutModalShowing
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			emptyCart,
			removeCartItem,
			showCartItemUpdateForm,
			showRemoveNoticeModal,
			//ToBeHandledLater: put the onClick on backdrop Component
			// at the component itself since the same action is called all the time
			clickBackDrop,
			showEmptyCartWarning,
			showCheckoutModal
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CartPage);
