import React, { Component } from "react";
import { connect } from "react-redux";

//styles
import styles from "../CSS/products_in_category.module.css";

//components
import EachProduct from "../../../components/Homepage/JS/each_product";
import Spinner from "../../../components/UI/JS/spinner";

//actions
import {
	showProductDetail,
	showAttrModal
} from "../../../actions/general/index";

class ProductsOnCategoryClick extends Component {
	render() {
		const {
			allProducts,
			productDetailed,
			attrModalOpen,
			showProductDetail,
			clickBackDrop,
			showAttrModal
		} = this.props;
		if (!allProducts) return <Spinner id={styles.spinnerPos} />;
		return (
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
			</div>
		);
	}
}

const mapStateToProps = state => ({
	allProducts: state.general.productsInCategory,
	productDetailed: state.general.productDetailedId,
	attrModalOpen: state.general.productIdAttrModalOpen,
	deptSidebarOpen: state.general.deptSidebarOpen
});

const mapDispatchToProps = dispatch => ({
	showProductDetail: prodId => dispatch(showProductDetail(prodId)),
	showAttrModal: prodId => dispatch(showAttrModal(prodId))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductsOnCategoryClick);
