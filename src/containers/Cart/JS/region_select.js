import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//styles
import styles from '../CSS/select.module.css';

//components
import { renderSelectField } from "../../../components/UI/JS/forms";

class RegionSelect extends Component {

	render() {
		const { regions} = this.props;
		const regionName = regions.map(region => region.shipping_region)
		return (
			<form className={styles.form}>
				<Field
					name="select_shipping_region"
					component={renderSelectField}
					options={regionName}
					className={styles.select}
				/>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	regionValue: state.form.region_select_field,
	regions: state.general.shippingRegions
});

export default reduxForm({
	form: "region_select_field"
})(connect(mapStateToProps)(RegionSelect));
