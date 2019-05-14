import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';

//style
import styles from "../CSS/search_product_form.module.css";

//component
import { renderInputField } from "../../../components/UI/JS/forms";

//acions
import { searchProducts } from "../../../actions/general/index";

class SearchProductsForm extends Component {
	search = e => {
		if (window.location.pathname !== "/search_results")
			this.props.history.push("/search_results");
		this.props.searchProducts(e.search);
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

function mapStateToProps(state) {
	return {
		searchInputFocus: state.general.searchInputFocus
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			searchProducts
		},
		dispatch
	);
}

export default reduxForm({
	form: "search products"
})(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(withRouter(SearchProductsForm))
);
