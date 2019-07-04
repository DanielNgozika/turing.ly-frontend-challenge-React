import React, { Component } from "react";
import { connect } from "react-redux";

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
	showCheckoutModal,
	errorHandler
} from "../../../actions/general/index";

//components
import EachCartItem from "../../../components/Cart/JS/each_cart_item";
import Modal from "../../../components/UI/JS/modal";
import Backdrop from "../../../components/UI/JS/top_backdrop";
import RegionSelect from "./region_select";
import ShippingType from "./shipping _type_select";
import CheckoutFormContainer from "../../Checkout/JS/checkout_form_container";
import Spinner from "../../../components/UI/JS/spinner";
import ErrorModal from "../../../components/UI/JS/error_modal";

class CartPage extends Component {
	state = {
		orderId: null,
		orderIdLoading: false
	};

	componentDidMount() {
		//onreload,
		//redirect to homepage because cartId will be null
		if (!this.props.cartId) this.props.history.push("/");
	}

	id = [];

	areYouSureModal = (
		<Modal styles={styles.warning_modal}>
			<p>All cart items will be removed</p>
			<button onClick={() => this.emptyCartFunc()}>continue</button>
			<button onClick={() => this.props.clickBackDrop()}>cancel</button>
		</Modal>
	);

	emptyCartFunc = () => {
		this.props.emptyCart(this.props.cartId);
		this.props.clickBackDrop();
	};

	computeTotalAmount = () => {
		const amount = this.props.cart
			.map(i => parseFloat(i.subtotal))
			.reduce((a, b) => a + b, 0)
			.toFixed(2);
		return amount;
	};

	checkoutModal = (
		<Modal styles={styles.checkout_modal}>
			{this.state.orderIdLoading ? (
				<Spinner id={styles.spinnerPos} />
			) : (
				<CheckoutFormContainer
					orderId={this.state.orderId}
					amount={this.computeTotalAmount}
				/>
			)}
		</Modal>
	);

	isTruthy = null;

	getShippingId = () => {
		const { shippingTypeSelect, regions, allShippingTypes } = this.props;
		if (
			shippingTypeSelect &&
			shippingTypeSelect.values &&
			shippingTypeSelect.values.shipping_type !== "select shipping type"
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
	};

	createOrder = async () => {
		try {
			if (localStorage.length === 0 || !localStorage.userData)
				this.props.history.push("./sign_up");
			else if (Date.now() > localStorage.expiresIn)
				this.props.history.push("/sign_in");
			else if (this.state.orderId) this.props.showCheckoutModal();
			else {
				this.setState({ orderIdLoading: true });
				this.props.showCheckoutModal();
				const token = localStorage.accessToken;
				const shippingId = this.id[0][0].shipping_id;
				const cartId = this.props.cartId;
				const request = await fetch(
					"https://backendapi.turing.com/orders",
					{
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/x-www-form-urlencoded",
							"User-Key": token
						},
						body: `cart_id=${cartId}&shipping_id=${shippingId}&tax_id=2`
					}
				);
				if (!request.ok) {
					const error = await request.json();
					throw Error(error.error.message);
				}
				const data = await request.json();
				this.setState({
					orderId: data.orderId,
					orderIdLoading: false
				});
			}
		} catch (err) {
			this.props.errorHandler(err);
			this.setState({
				orderIdLoading: false
			});
		}
	};

	showCart = () => {
		const { cart, backdropVisible } = this.props;
		if (cart.length === 0) return <p>Cart empty</p>;
		else
			return (
				<div className={styles.items}>
					{cart.map(item => (
						<EachCartItem
							key={item.item_id}
							item={item}
							removeItem={this.props.removeCartItem}
							showUpdateForm={this.props.showCartItemUpdateForm}
							itemUpdated={this.props.itemUpdated}
							showRemoveModal={this.props.showRemoveNoticeModal}
							removeModalOpen={this.props.removalModal}
							cancelRemoval={this.props.clickBackDrop}
							backdrop={backdropVisible}
							clickBackdrop={clickBackDrop}
						/>
					))}
					<hr className={styles.items_hr} />
					<div className={styles.total_div}>
						<span>Total:</span>
						<span>$ {this.computeTotalAmount()}</span>
					</div>
					<h3>Shipping Region</h3>
					<RegionSelect />
					<h3>Shipping Type</h3>
					<ShippingType />
					<button
						className={styles.order}
						disabled={this.isTruthy}
						onClick={this.createOrder}
					>
						Create order
					</button>
				</div>
			);
	};

	render() {
		const {
			history,
			showEmptyCartWarning,
			warningModal,
			backdropVisible,
			clickBackDrop,
			regionValue,
			shippingTypeSelect,
			checkoutModalShowing
		} = this.props;

		this.isTruthy =
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

		const { showing, message } = this.props.errorModal;
		return (
			<>
				{showing ? (
					<ErrorModal
						message={message}
						show={showing ? true : false}
					/>
				) : null}
				<header className={styles.header}>
					<i
						className="fas fa-arrow-left"
						onClick={() => history.go(-1)}
					/>
					<span>CART</span>
					<i
						className="fas fa-trash"
						onClick={() => showEmptyCartWarning()}
					/>
				</header>
				{this.showCart()}
				{backdropVisible ? (
					<Backdrop onClick={() => clickBackDrop()} />
				) : null}
				{warningModal ? this.areYouSureModal : null}
				{this.getShippingId()}
				{checkoutModalShowing ? this.checkoutModal : null}
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
	checkoutModalShowing: state.general.checkoutModalShowing,
	errorModal: state.general.errorModal
});

const mapDispatchToProps = dispatch => ({
	emptyCart: cartId => emptyCart(dispatch, cartId),
	removeCartItem: itemId => removeCartItem(dispatch, itemId),
	showCartItemUpdateForm: itemId => dispatch(showCartItemUpdateForm(itemId)),
	showRemoveNoticeModal: itemId => dispatch(showRemoveNoticeModal(itemId)),
	//ToBeHandledLater: put the onClick on backdrop Component
	// at the component itself since the same action is called all the time
	clickBackDrop: () => dispatch(clickBackDrop()),
	showEmptyCartWarning: () => dispatch(showEmptyCartWarning()),
	showCheckoutModal: () => dispatch(showCheckoutModal()),
	errorHandler: (...args) => errorHandler(...args, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CartPage);
