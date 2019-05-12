import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//styles
import styles from "../CSS/products_in_category.module.css";

//actions
import {
	getProductsInCategory,
	showProductDetail,
	showAttrModal,
	clickBackDrop
} from "../../../actions/general/index";

import EachProduct from "../../../components/Homepage/JS/each_product";
import Spinner from "../../../components/UI/JS/spinner";
import Backdrop from "../../../components/UI/JS/top_backdrop";
import CartCounter from "./cart_counter";

class ProductsInCategory extends Component {
	render() {
		if (!this.props.allProducts) return <Spinner id={styles.spinnerPos}/>;
		return (
			<>
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
				<CartCounter />
				{this.props.backdropVisible ? (
					<Backdrop onClick={this.props.clickBackDrop} />
				) : null}
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		allProducts: state.general.productsInCategory,
		productDetailed: state.general.productDetailedId,
		backdropVisible: state.general.backdropVisible,
		attrModalOpen: state.general.productIdAttrModalOpen
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			getProductsInCategory,
			showProductDetail,
			clickBackDrop,
			showAttrModal
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductsInCategory);
