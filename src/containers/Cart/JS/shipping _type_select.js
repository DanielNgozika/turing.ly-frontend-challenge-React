import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

//styles
import styles from "../CSS/select.module.css";

//components
import { renderSelectField } from "../../../components/UI/JS/forms";

class ShippingType extends Component {
	filteredRegion = [];

	shippingTypes = () => {
		if (this.filteredRegion.length > 0)
			return this.props.allShippingTypes[
				this.filteredRegion[0].shipping_region_id
			]
				.map(type => type.shipping_type)
				.concat(["select shipping type"]);
		else return ["select region above"];
	};

	render() {
		const { regionValue, regions } = this.props;

		if (
			regionValue &&
			regionValue.values &&
			regionValue.values.select_shipping_region !== "Please Select"
		)
			this.filteredRegion = regions.filter(
				region =>
					region.shipping_region ===
					regionValue.values.select_shipping_region
			);

		return (
			<form className={styles.form}>
				<Field
					name="shipping_type"
					component={renderSelectField}
					options={this.shippingTypes()}
					className={styles.select}
				/>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	regionValue: state.form.region_select_field,
	regions: state.general.shippingRegions,
	allShippingTypes: state.general.shippingTypesPerRegion
});

export default reduxForm({
	form: "shipping_type_select_field",
	initialValues: { shipping_type: "select shipping type" }
})(connect(mapStateToProps)(ShippingType));
