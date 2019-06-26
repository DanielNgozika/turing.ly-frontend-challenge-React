import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "../CSS/search_results_page.module.css";

import SearchProductsForm from "../../Homepage/JS/search_product_form";
import EachProduct from "../../../components/Homepage/JS/each_product";
import Backdrop from "../../../components/UI/JS/top_backdrop";
import ButtToolbar from "../../../components/Homepage/JS/Toolbar/bottom_toolbar";
import ButtNavItem from "../../../components/Homepage/JS/Toolbar/butt_nav_item";
import CartCounter from "../../Homepage/JS/cart_counter";
import ErrorModal from "../../../components/UI/JS/error_modal";

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
		const { showing, message } = this.props.errorModal;
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

		if (results !== null && results.count && results.count !== 0)
			return (
				<>
					{showing ? (
						<ErrorModal
							message={message}
							show={showing ? true : false}
						/>
					) : null}
					{top}
					<h5 className={styles.number}>
						{results.count}{" "}
						{results.count === 1 ? "result" : "results"} found.
					</h5>
					<div className={styles.result_div}>
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
					</div>
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
	attrModalOpen: state.general.productIdAttrModalOpen,
	errorModal: state.general.errorModal
});

const mapDispatchToProps = {
	showProductDetail,
	clickBackDrop,
	showAttrModal
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResults);