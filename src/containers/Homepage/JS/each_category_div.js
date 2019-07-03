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
		products: null,
		scrolledWidth: window.innerWidth - 230
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
		const { products, scrolledWidth } = this.state;
		if (PrevState.products && products && scrolledWidth) {
			if (
				prevProps === this.props &&
				PrevState.products.length === products.length &&
				PrevState.scrolledWidth === scrolledWidth
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
			.scrollBy(230, 0);
		this.setState(state => ({ scrolledWidth: state.scrolledWidth + 230 }));
	};

	scrollLeft = () => {
		const id = this.props.category.category_id;
		document
			.querySelector(`#${styles.product_div.concat(`${id}`)}`)
			.scrollBy(-230, 0);
		this.setState(state => ({ scrolledWidth: state.scrolledWidth - 230 }));
	};

	render() {
		const { products, scrolledWidth } = this.state;
		const id = this.props.category.category_id;
		const isWindowLarger =
			products &&
			window.innerWidth - 230 >
				products.length * 130 + (products.length - 1) * 20 + 20 &&
			window.innerWidth > 900
				? true
				: false;
		return (
			<>
				<div className={styles.div}>
					<section className={styles.top}>
						<h4>{this.props.category.name}</h4>{" "}
						<span>(Best selling)</span>
					</section>
					{!isWindowLarger ? (
						<section className={styles.button_div}>
							<button
								onClick={this.scrollLeft}
								disabled={
									scrolledWidth === window.innerWidth - 230
								}
							>
								<i className="fas fa-chevron-left" />
							</button>
							<button
								onClick={this.scrollRight}
								disabled={
									products &&
									scrolledWidth >=
										products.length * 130 +
											(products.length - 1) * 20 +
											20
								}
							>
								<i className="fas fa-chevron-right" />
							</button>
						</section>
					) : null}
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
