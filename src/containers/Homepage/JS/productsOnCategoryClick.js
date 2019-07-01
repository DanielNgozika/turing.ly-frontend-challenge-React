import React, { Component } from "react";
import { connect } from "react-redux";

//styles
import styles from "../CSS/products_in_category.module.css";

//components
import EachProduct from "../../../components/Homepage/JS/each_product";
import Spinner from "../../../components/UI/JS/spinner";
import Paginator from "../../../components/Homepage/JS/paginator";

//actions
import {
	showProductDetail,
	showAttrModal,
	getProductsInCategory
} from "../../../actions/general/index";

class ProductsOnCategoryClick extends Component {
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
				<Paginator
					page={this.state.page}
					nextPage={this.nextPage}
					prevPage={this.prevPage}
					nosOfProducts={allProducts.length}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	allProducts: state.general.productsInCategory,
	productDetailed: state.general.productDetailedId,
	attrModalOpen: state.general.productIdAttrModalOpen,
	deptSidebarOpen: state.general.deptSidebarOpen,
	categoryActive: state.general.categoryActive
});

const mapDispatchToProps = dispatch => ({
	showProductDetail: prodId => dispatch(showProductDetail(prodId)),
	showAttrModal: prodId => dispatch(showAttrModal(prodId)),
	getProducts: (...args) => getProductsInCategory(dispatch, ...args)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductsOnCategoryClick);
