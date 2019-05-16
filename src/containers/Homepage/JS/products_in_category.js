import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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

//actions
import {
	getProductsInCategory,
	showProductDetail,
	showAttrModal,
	clickBackDrop,
	openDeptSidebar
} from "../../../actions/general/index";

class ProductsInCategory extends Component {
	render() {
		if (!this.props.allProducts) return <Spinner id={styles.spinnerPos} />;
		return (
			<>
				<header className={styles.header}>
					<i
						className="fas fa-arrow-left"
						onClick={() => window.history.go(-1)}
					/>
					<h4>{window.location.pathname.split("/")[1]}</h4>
				</header>
				<div className={styles.div}>
					{this.props.allProducts.map(prod => (
						<EachProduct
							key={prod.product_id}
							product={prod}
							clicked={this.props.showProductDetail}
							productDetailed={this.props.productDetailed}
							clickBackDrop={this.props.clickBackDrop}
							showAttrModal={this.props.showAttrModal}
							attrModalOpen={this.props.attrModalOpen}
						/>
					))}
				</div>
				<>
					<LeftSidedrawer
						open={this.props.deptSidebarOpen ? true : false}
						onClick={this.props.clickBackDrop}
					>
						<DeptsSideNav />
					</LeftSidedrawer>
				</>
				<CartCounter />
				{this.props.backdropVisible ? (
					<Backdrop onClick={this.props.clickBackDrop} />
				) : null}
				<ButtToolbar>
					<ButtNavItem
						buttName="department"
						icon={
							<i>
								<CategoryIcon />
							</i>
						}
						onClick={this.props.openDeptSidebar}
					/>
					{localStorage.fbLoggedIn === "true" ||
					Date.now() < localStorage.expiresIn ? (
						<ButtNavItem
							icon={<i className="fas fa-user" />}
							onClick={this.searchIconClick}
						/>
					) : null}
				</ButtToolbar>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		allProducts: state.general.productsInCategory,
		productDetailed: state.general.productDetailedId,
		backdropVisible: state.general.backdropVisible,
		attrModalOpen: state.general.productIdAttrModalOpen,
		deptSidebarOpen: state.general.deptSidebarOpen
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			getProductsInCategory,
			showProductDetail,
			clickBackDrop,
			showAttrModal,
			openDeptSidebar
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductsInCategory);
