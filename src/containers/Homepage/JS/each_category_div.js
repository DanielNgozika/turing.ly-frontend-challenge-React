import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Spinner from "../../../components/UI/JS/spinner";
import EachProduct from "../../../components/Homepage/JS/each_product";

//actions
import { showProductDetail, showAttrModal } from "../../../actions/general/index";

//styles
import styles from "../CSS/each_category_div.module.css";

class EachCategoryDiv extends Component {
	state = {
		products: null
	};

	componentDidMount() {
		fetch(
			`https://backendapi.turing.com/products/inCategory/${
				this.props.category.category_id
			}?limit=10`
		)
			.then(res => res.json())
			.then(data => this.setState({ products: data.rows }))
			.catch(err => console.log(err));
	}

	products = () => {
		if (this.state.products)
		return this.state.products.map(product => {
			return (
				<EachProduct
						key={product.product_id}
						product={product}
						clicked={this.props.showProductDetail}
						productDetailed={this.props.productDetailed}
						showAttrModal={this.props.showAttrModal}
						attrModalOpen={this.props.attrModalOpen}
					/>
				);
			});
		else return <Spinner />;
	};

	render() {
		return (
			<>
				<div className={styles.div}>
					<h4>{this.props.category.name}</h4>
					<div className={styles.product_div}>{this.products()}</div>
				</div>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		productDetailed: state.general.productDetailedId,
		attrModalOpen: state.general.productIdAttrModalOpen
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			showProductDetail,
			showAttrModal
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EachCategoryDiv);
