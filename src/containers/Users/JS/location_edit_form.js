import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

//style
import styles from "../CSS/personal_edit_form.module.css";

//component
import {
	renderInputField,
	renderSelectField
} from "../../../components/UI/JS/forms";
import { USCanada, Europe, restOfTheWorld } from "./countries";

//actions
import {
	hideLocationEditForm,
	errorHandler
} from "../../../actions/general/index";

class LocationEditForm extends Component {
	selectCountries = [];

	submit = async e => {
		const {
			address_1,
			address_2,
			city,
			region,
			postal_code,
			country,
			shipping_region_id
		} = e;
		const token = localStorage.accessToken;
		try {
			const request = await fetch(
				"https://backendapi.turing.com/customers/address",
				{
					method: "PUT",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/x-www-form-urlencoded",
						"User-key": token
					},
					body: `address_1=${address_1}&address_2=${address_2}&city=${city}&region=${region}&postal_code=${postal_code}&country=${country}&shipping_region_id=${shipping_region_id}`
				}
			);
			if (!request.ok) {
				const error = await request.json();
				throw Error(error.error.message);
			}
			const data = await request.json();
			localStorage.setItem("userData", JSON.stringify(data));
			this.props.hideLocationEditForm();
		} catch (err) {
			this.props.errorHandler(err);
		}
	};

	regionNames = this.props.regions.map(region => region.shipping_region);

	render() {
		const { regionValue } = this.props;
		const isRegionValueAvailable =
			regionValue &&
			regionValue.values &&
			regionValue.values.region !== "Please Select";
		const isRegionValuePleaseSelect =
			regionValue &&
			regionValue.values &&
			regionValue.values.region === "Please Select";

		if (
			isRegionValueAvailable &&
			regionValue.values.region === "US / Canada"
		)
			this.selectCountries = USCanada.map(country => country);
		else if (
			isRegionValueAvailable &&
			regionValue.values.region === "Europe"
		)
			this.selectCountries = Europe.map(country => country);
		else if (
			isRegionValueAvailable &&
			regionValue.values.region === "Rest of World"
		)
			this.selectCountries = restOfTheWorld.map(country => country);

		return (
			<form
				className={styles.form}
				onSubmit={this.props.handleSubmit(e => this.submit(e))}
			>
				<p>Address_1:</p>
				<Field
					name="address_1"
					type="text"
					component={renderInputField}
					className={styles.input}
					error={styles.error}
					placeholder={"enter address"}
				/>
				<p>Address_2:</p>
				<Field
					name="address_2"
					type="text"
					component={renderInputField}
					className={styles.input}
					placeholder={"enter address (cont'd)"}
				/>
				<p>City:</p>
				<Field
					name="city"
					type="text"
					component={renderInputField}
					className={styles.input}
					error={styles.error}
					placeholder={"enter city"}
				/>
				<p>Region:</p>
				<Field
					name="region"
					component={renderSelectField}
					options={this.regionNames}
					className={styles.input}
					error={styles.error}
				/>
				<p>Postal code:</p>
				<Field
					name="postal_code"
					type="text"
					component={renderInputField}
					className={styles.input}
					error={styles.error}
					placeholder={"enter postal code"}
				/>
				<p>Country:</p>
				<Field
					name="country"
					component={renderSelectField}
					options={
						isRegionValuePleaseSelect
							? ["Select region above"]
							: this.selectCountries
					}
					className={styles.input}
					error={styles.error}
				/>
				<p>Shipping region id:</p>
				<Field
					name="shipping_region_id"
					type="number"
					component={renderInputField}
					className={styles.input}
					error={styles.error}
					placeholder={"enter shipping region id"}
				/>
				<button type="submit">Update</button>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	regions: state.general.shippingRegions,
	regionValue: state.form.location_edit_form
});

const mapDispatchToProps = dispatch => ({
	hideLocationEditForm: () => dispatch(hideLocationEditForm()),
	errorHandler: (...args) => errorHandler(dispatch, ...args)
});

const {
	address_1,
	address_2,
	city,
	region,
	postal_code,
	country,
	shipping_region_id
} = JSON.parse(localStorage.userData);

const validate = values => {
	const errors = {};

	if (!values.address_1) errors.address_1 = true;
	if (!values.city) errors.city = true;
	if (!values.region || values.region === "Please Select")
		errors.region = true;
	if (!values.postal_code) errors.postal_code = true;
	if (
		!values.country ||
		values.country === ("Select region above" || "select country")
	)
		errors.country = true;
	if (!values.shipping_region_id) errors.shipping_region_id = true;

	return errors;
};

export default reduxForm({
	validate,
	form: "location_edit_form",
	initialValues: {
		address_1:
			address_1 === null || address_1 === "null" ? "" : `${address_1}`,
		address_2:
			address_2 === null || address_2 === "null" ? "" : `${address_2}`,
		city: city === null || city === "null" ? "" : `${city}`,
		region:
			region === null || region === "null"
				? "Please Select"
				: `${region}`,
		postal_code:
			postal_code === null || postal_code === "null"
				? ""
				: `${postal_code}`,
		country:
			country === null || country === "null"
				? "Select region above"
				: `${country}`,
		shipping_region_id:
			shipping_region_id === null || shipping_region_id === "null"
				? ""
				: `${shipping_region_id}`
	}
})(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(LocationEditForm)
);
