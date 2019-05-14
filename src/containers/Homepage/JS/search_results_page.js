import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import styles from "../CSS/search_results_page.module.css";

import SearchProductsForm from "./search_product_form";
import EachProduct from "../../../components/Homepage/JS/each_product";
import Backdrop from "../../../components/UI/JS/top_backdrop";
import ButtToolbar from "../../../components/Homepage/JS/Toolbar/bottom_toolbar";
import ButtNavItem from "../../../components/Homepage/JS/Toolbar/butt_nav_item";
import CartCounter from "./cart_counter";

//actions
import {
	showProductDetail,
	clickBackDrop,
	showAttrModal
} from "../../../actions/general/index";

class SearchResults extends Component {
	searchIconClick() {
		let searchInput = document.querySelector(
			".search_product_form_input__3hB0a"
		);
		searchInput.focus();
	}

	render() {
		const { results } = this.props;
		const top = (
			<header className={styles.header}>
				<i
					className="fas fa-arrow-left"
					onClick={() => window.history.go(-1)}
				/>
				<SearchProductsForm />
			</header>
		);
		const bottom = (
			<>
				<CartCounter />
				<ButtToolbar>
					<ButtNavItem
						icon={<i className="fas fa-home" />}
						onClick={() => this.props.history.push("/")}
					/>
					<ButtNavItem
						icon={<i className="fas fa-search" />}
						onClick={this.searchIconClick}
					/>
				</ButtToolbar>
			</>
		);

		if (results !== null && results.count && results.count !== 0)
			return (
				<>
					{top}
					<h5 className={styles.number}>
						{results.count}{" "}
						{results.count === 1 ? "result" : "results"} found.
					</h5>
					{results.rows.map(product => (
						<EachProduct
							product={product}
							key={product.product_id}
							clicked={this.props.showProductDetail}
							productDetailed={this.props.productDetailed}
							clickBackDrop={this.props.clickBackDrop}
							showAttrModal={this.props.showAttrModal}
							attrModalOpen={this.props.attrModalOpen}
						/>
					))}
					{this.props.backdropVisible ? (
						<Backdrop onClick={this.props.clickBackDrop} />
					) : null}
					{bottom}
				</>
			);
		else {
			return (
				<>
					{top}
					<p className={styles.no_result}>No results found</p>
					{bottom}
				</>
			);
		}
	}
}

const mapStateToProps = state => ({
	results: state.general.searchResults,
	productDetailed: state.general.productDetailedId,
	backdropVisible: state.general.backdropVisible,
	attrModalOpen: state.general.productIdAttrModalOpen
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			showProductDetail,
			clickBackDrop,
			showAttrModal
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResults);
