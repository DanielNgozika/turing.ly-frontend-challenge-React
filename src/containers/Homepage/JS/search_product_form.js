import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//style
import styles from "../CSS/search_product_form.module.css";

//component
import { renderInputField } from "../../../components/UI/JS/forms";

//acions
import { searchProducts, setSearchQuery } from "../../../actions/general/index";

class SearchProductsForm extends Component {
	search = e => {
		if (window.location.pathname !== "/search_results")
			this.props.history.push("/search_results");
		this.props.searchProducts(e.search, 1);
		this.props.setSearchQuery(e.search);
	};

	loggedInStatus =
		localStorage.length === 0 ||
		(Date.now() > localStorage.expiresIn &&
			localStorage.fbLoggedIn === "false");
	render() {
		return (
			<form
				className={
					this.loggedInStatus ? styles.form : styles.form_wider
				}
				onSubmit={this.props.handleSubmit(e => this.search(e))}
			>
				<Field
					name="search"
					type="text"
					className={styles.input}
					component={renderInputField}
					placeholder="search products"
				/>
			</form>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	searchProducts: (...args) => searchProducts(dispatch, ...args),
	setSearchQuery: query => dispatch(setSearchQuery(query))
});

export default reduxForm({
	form: "search products"
})(
	connect(
		null,
		mapDispatchToProps
	)(withRouter(SearchProductsForm))
);
