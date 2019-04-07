import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//style
import styles from '../CSS/search_product_form.module.css';

//component
import { renderInputField } from '../../../components/UI/JS/forms'

class SearchProductsForm extends Component {
	render() {
		return (
			<form className={styles.form}>
				<Field
					name="search"
					type="text"
					className={styles.input}
					component={renderInputField}
					placeholder="search products"
				/>
			</form>
		)
	}
}

function mapStateToProps(state) {
	return {
		searchInputFocus: state.general.searchInputFocus
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({

	}, dispatch)
}

export default reduxForm({
	form: 'search products'
})(connect(mapStateToProps, mapDispatchToProps)(SearchProductsForm));