import React, { Component } from "react";
import { connect } from "react-redux";

//styles
import styles from "../CSS/products_in_category.module.css";

//components
import ButtNavItem from "../../../components/Homepage/JS/Toolbar/butt_nav_item";
import { CategoryIcon } from "../../../components/UI/JS/icons";
import ButtToolbar from "../../../components/Homepage/JS/Toolbar/bottom_toolbar";
import EachProduct from "../../../components/Homepage/JS/each_product";
import Spinner from "../../../components/UI/JS/spinner";
import Backdrop from "../../../components/UI/JS/top_backdrop";
import CartCounter from "./cart_counter";
import LeftSidedrawer from "../../../components/UI/JS/left_side_drawer";
import DeptsSideNav from "./depts_side_nav";
import ErrorModal from "../../../components/UI/JS/error_modal";
import Paginator from "../../../components/Homepage/JS/paginator";

//actions
import {
	showProductDetail,
	showAttrModal,
	clickBackDrop,
	openDeptSidebar,
	getProductsInCategory
} from "../../../actions/general/index";

class ProductsInCategory extends Component {
	state = {
		page: 1
	};

	nextPage = async () => {
		const { getProducts, categoryActive } = this.props;
		await this.setState(state => ({ page: state.page + 1 }));
		getProducts(categoryActive, this.state.page);
	};
	prevPage = async () => {
		const { getProducts, categoryActive } = this.props;
		await this.setState(state => ({ page: state.page - 1 }));
		getProducts(categoryActive, this.state.page);
	};

	render() {
		const {
			allProducts,
			productDetailed,
			backdropVisible,
			attrModalOpen,
			deptSidebarOpen,
			showProductDetail,
			clickBackDrop,
			showAttrModal,
			openDeptSidebar,
			errorModal
		} = this.props;
		const { showing, message } = errorModal;
		const top = (
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
						onClick={() => window.history.go(-1)}
					/>
					<h4>{window.location.pathname.split("/")[1]}</h4>
				</header>
			</>
		);
		if (!allProducts)
			return (
				<>
					{top}
					<Spinner id={styles.spinnerPos} />
				</>
			);
		return (
			<>
				{top}
				<div className={styles.div}>
					{allProducts.map(prod => (
						<EachProduct
							key={prod.product_id}
							product={prod}
							clicked={showProductDetail}
							productDetailed={productDetailed}
							clickBackDrop={clickBackDrop}
							showAttrModal={showAttrModal}
							attrModalOpen={attrModalOpen}
						/>
					))}
					<Paginator
						page={this.state.page}
						nextPage={this.nextPage}
						prevPage={this.prevPage}
						nosOfProducts={allProducts.length}
					/>
				</div>
				<>
					<LeftSidedrawer
						open={deptSidebarOpen ? true : false}
						onClick={clickBackDrop}
					>
						<DeptsSideNav />
					</LeftSidedrawer>
				</>
				<CartCounter />
				{backdropVisible ? <Backdrop onClick={clickBackDrop} /> : null}
				<ButtToolbar>
					<ButtNavItem
						buttName="department"
						icon={
							<i>
								<CategoryIcon />
							</i>
						}
						onClick={openDeptSidebar}
					/>
					{localStorage.fbLoggedIn === "true" ||
					Date.now() < localStorage.expiresIn ? (
						<ButtNavItem
							icon={<i className="fas fa-user" />}
							onClick={() => this.props.history.push("/profile")}
						/>
					) : null}
				</ButtToolbar>
			</>
		);
	}
}

const mapStateToProps = state => ({
	allProducts: state.general.productsInCategory,
	productDetailed: state.general.productDetailedId,
	backdropVisible: state.general.backdropVisible,
	attrModalOpen: state.general.productIdAttrModalOpen,
	deptSidebarOpen: state.general.deptSidebarOpen,
	errorModal: state.general.errorModal,
	categoryActive: state.general.categoryActive
});

const mapDispatchToProps = dispatch => ({
	showProductDetail: prodId => dispatch(showProductDetail(prodId)),
	clickBackDrop: () => dispatch(clickBackDrop()),
	showAttrModal: prodId => dispatch(showAttrModal(prodId)),
	openDeptSidebar: () => dispatch(openDeptSidebar()),
	getProducts: (...args) => getProductsInCategory(dispatch, ...args)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductsInCategory);
