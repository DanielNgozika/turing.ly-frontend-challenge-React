import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

//style
import styles from "../CSS/personal_edit_form.module.css";

//component
import { renderInputField } from "../../../components/UI/JS/forms";

//actions
import {
	hidePersonalEditForm,
	errorHandler
} from "../../../actions/general/index";

class PersonalEditForm extends Component {
	submit = async e => {
		const { name, email, password, day_phone, eve_phone, mob_phone } = e;
		const token = localStorage.accessToken;
		try {
			const request = await fetch(
				"https://backendapi.turing.com/customer",
				{
					method: "PUT",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/x-www-form-urlencoded",
						"User-key": token
					},
					body: `name=${name}&email=${email}&password=${password}&day_phone=${day_phone}&eve_phone=${eve_phone}&mob_phone=${mob_phone}`
				}
			);
			if (!request.ok) {
				const error = await request.json();
				throw Error(error.error.message);
			}
			const data = await request.json();
			localStorage.setItem("userData", JSON.stringify(data));
			this.props.hidePersonalEditForm();
		} catch (err) {
			this.props.errorHandler(err);
		}
	};

	render() {
		return (
			<form
				className={styles.form}
				onSubmit={this.props.handleSubmit(e => this.submit(e))}
			>
				<p>Name:</p>
				<Field
					name="name"
					type="text"
					component={renderInputField}
					className={styles.input}
					error={styles.error}
				/>
				<p>Email:</p>
				<Field
					name="email"
					type="email"
					component={renderInputField}
					className={styles.input}
					error={styles.error}
				/>
				<p>Password:</p>
				<Field
					name="password"
					type="password"
					component={renderInputField}
					className={styles.input}
				/>
				<p>Day phone:</p>
				<Field
					name="day_phone"
					type="number"
					component={renderInputField}
					className={styles.input}
				/>
				<p>Evening phone:</p>
				<Field
					name="eve_phone"
					type="number"
					component={renderInputField}
					className={styles.input}
				/>
				<p>Mobile phone:</p>
				<Field
					name="mob_phone"
					type="number"
					component={renderInputField}
					className={styles.input}
				/>
				<button type="submit">Update</button>
			</form>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
	hidePersonalEditForm: () => dispatch(hidePersonalEditForm()),
	errorHandler: (...args) => errorHandler(dispatch, ...args)
});

const { name, email, eve_phone, mob_phone, day_phone } = JSON.parse(
	localStorage.userData
);

const validate = values => {
	const errors = {};

	if (!values.email) errors.email = true;
	if (!values.name) errors.name = true;

	return errors;
};

export default reduxForm({
	validate,
	form: "personal_edit_form",
	initialValues: {
		name: `${name}`,
		email: `${email}`,
		day_phone: `${day_phone}`,
		eve_phone: `${eve_phone}`,
		mob_phone: `${mob_phone}`
	}
})(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(PersonalEditForm)
);
