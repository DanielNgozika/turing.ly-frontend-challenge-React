import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../../../components/UI/JS/spinner";
import EachProduct from "../../../components/Homepage/JS/each_product";

//actions
import {
	showProductDetail,
	showAttrModal,
	errorHandler
} from "../../../actions/general/index";

//styles
import styles from "../CSS/each_category_div.module.css";

class EachCategoryDiv extends Component {
	state = {
		products: null
	};

	async componentDidMount() {
		try {
			const request = await fetch(
				`https://backendapi.turing.com/products/inCategory/${
					this.props.category.category_id
				}?limit=10`
			);
			if (!request.ok) {
				const error = await request.json();
				throw Error(error.error.message);
			}
			const data = await request.json();
			this.setState({ products: data.rows });
		} catch (err) {
			this.props.errorHandler(err);
		}
	}

	shouldComponentUpdate(prevProps, PrevState) {
		if (PrevState.products && this.state.products) {
			if (
				prevProps === this.props &&
				PrevState.products.length === this.state.products.length
			)
				return false;
		}
		return true;
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

	scrollRight = () => {
		const id = this.props.category.category_id;
		document
			.querySelector(`#${styles.product_div.concat(`${id}`)}`)
			.scrollBy(130, 0);
	};

	scrollLeft = () => {
		const id = this.props.category.category_id;
		document
			.querySelector(`#${styles.product_div.concat(`${id}`)}`)
			.scrollBy(-130, 0);
	};

	render() {
		const id = this.props.category.category_id;
		return (
			<>
				<div className={styles.div}>
					<section className={styles.top}>
						<h4>{this.props.category.name}</h4>{" "}
						<span>(Best selling)</span>
					</section>
					<section className={styles.button_div}>
						<button onClick={this.scrollLeft}>
							<i className="fas fa-chevron-left" />
						</button>
						<button onClick={this.scrollRight}>
							<i className="fas fa-chevron-right" />
						</button>
					</section>
					<div
						className={styles.product_div}
						id={styles.product_div.concat(`${id}`)}
					>
						{this.products()}
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => ({
	productDetailed: state.general.productDetailedId,
	attrModalOpen: state.general.productIdAttrModalOpen
});

const mapDispatchToProps = dispatch => ({
	showProductDetail: prodId => dispatch(showProductDetail(prodId)),
	showAttrModal: prodId => dispatch(showAttrModal(prodId)),
	errorHandler: (...args) => errorHandler(...args, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EachCategoryDiv);
