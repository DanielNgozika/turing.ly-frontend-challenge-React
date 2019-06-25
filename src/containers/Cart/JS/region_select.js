import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

//styles
import styles from "../CSS/select.module.css";

//components
import { renderSelectField } from "../../../components/UI/JS/forms";

class RegionSelect extends Component {
	regionName = this.props.regions.map(region => region.shipping_region);

	render() {
		return (
			<form className={styles.form}>
				<Field
					name="select_shipping_region"
					component={renderSelectField}
					options={this.regionName}
					className={styles.select}
				/>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	regions: state.general.shippingRegions
});

export default reduxForm({
	form: "region_select_field"
})(connect(mapStateToProps)(RegionSelect));
