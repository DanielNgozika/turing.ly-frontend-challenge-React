import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { renderInputField } from "../../../components/UI/JS/forms";
import ErrorModal from "../../../components/UI/JS/error_modal";

//actions
import { errorHandler } from "../../../actions/general/index";

//style
import styles from "../CSS/sign_in.module.css";

class SignUp extends Component {
	componentDidMount() {
		const tokenExpirationTime = localStorage.expiresIn;
		const fbLoggedInState = localStorage.fbLoggedIn;

		if (
			Date.now() < parseInt(tokenExpirationTime) ||
			fbLoggedInState === "true"
		) {
			if (document.referrer.match(`${window.location.host}/sign_in`))
				this.props.history.push("/");
			else window.history.back();
		}
	}

	signUp = async e => {
		try {
			const { email, full_name, password } = e;
			const request = await fetch(
				"https://backendapi.turing.com/customers",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: `name=${full_name}&email=${email}&password=${password}`
				}
			);
			if (!request.ok) {
				const error = await request.json();
				throw Error(error.error.message);
			}
			const data = await request.json();
			localStorage.setItem("accessToken", `${data.accessToken}`);
			localStorage.setItem(
				"expiresIn",
				`${Date.now() + 3600000 * parseInt(`${data.expires_in}`)}`
			);
			localStorage.setItem(
				"userData",
				`${JSON.stringify(data.customer)}`
			);
			this.props.history.goBack();
		} catch (err) {
			this.props.errorHandler(err);
		}
	};

	render() {
		const { showing, message } = this.props.errorModal;
		const { form } = this.props;
		const isTruthy =
			(form && !form.values) ||
			(form && !form.values.full_name) ||
			(form && !form.values.password) ||
			(form && !form.values.email);
		return (
			<div className={styles.div}>
				{showing ? (
					<ErrorModal
						message={message}
						show={showing ? true : false}
					/>
				) : null}
				<div className={styles.header}>
					<i
						className="fas fa-arrow-left"
						onClick={() => window.history.back()}
					/>
					<Link to="/sign_in">sign in</Link>
				</div>
				<h1>Sign Up</h1>
				<form
					className={styles.form}
					onSubmit={this.props.handleSubmit(e => this.signUp(e))}
				>
					<Field
						name="full_name"
						type="text"
						placeholder="full name"
						className={styles.input}
						error={styles.error}
						component={renderInputField}
					/>
					<Field
						name="email"
						type="email"
						placeholder="enter email"
						className={styles.input}
						error={styles.error}
						component={renderInputField}
					/>
					<Field
						name="password"
						type="password"
						placeholder="enter password"
						className={styles.input}
						error={styles.error}
						component={renderInputField}
					/>
					<button type="submit" disabled={isTruthy}>
						Sign Up
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	form: state.form.sign_up_form,
	errorModal: state.general.errorModal
});

const mapDispatchToProps = dispatch => ({
	errorHandler: (...args) => errorHandler(...args, dispatch)
});

const validate = values => {
	const errors = {};

	if (!values.full_name) errors.full_name = true;
	if (!values.email) errors.email = true;
	if (!values.password) errors.password = true;

	return errors;
};

export default reduxForm({
	validate,
	form: "sign_up_form"
})(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SignUp)
);
