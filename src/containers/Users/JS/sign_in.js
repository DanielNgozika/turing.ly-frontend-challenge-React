import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { renderInputField } from "../../../components/UI/JS/forms";

//style
import styles from "../CSS/sign_in.module.css";

class SignIn extends Component {
	signIn = e => {
		const { email, password } = e;
		fetch("https://backendapi.turing.com/customers/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `email=${email}&password=${password}`
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(data => {
				localStorage.setItem("accessToken", `${data.accessToken}`);
				localStorage.setItem(
					"expiresIn",
					`${Date.now() + 3600000 * parseInt(`${data.expires_in}`)}`
				);
				localStorage.setItem('userData', `${data.customer}`);
				this.props.history.goBack();
			})
			.catch(err => {
				if (err.message === "Failed to fetch")
					alert("Connection lost. Check your network and retry");
				else console.log(err.message);
			});
	};

	render() {
		const { form } = this.props;
		const isTruthy =
			(form && !form.values) ||
			(form && !form.values.password) ||
			(form && !form.values.email);
		return (
			<div className={styles.div}>
				<div className={styles.header}>
					<i className="fas fa-arrow-left" />
					<Link to="/sign_up">sign up</Link>
				</div>
				<h1>Sign in</h1>
				<form
					className={styles.form}
					onSubmit={this.props.handleSubmit(e => this.signIn(e))}
				>
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
						Sign in
					</button>
				</form>
				<p>or</p>
				<button className={styles.fb_login}>log in with facebook</button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	form: state.form.sign_in_form
});

const validate = values => {
	const errors = {};

	if (!values.email) errors.email = true;
	if (!values.password) errors.password = true;

	return errors;
};

export default reduxForm({
	validate,
	form: "sign_in_form"
})(
	connect(
		mapStateToProps,
		null
	)(SignIn)
);
