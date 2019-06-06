import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { renderInputField } from "../../../components/UI/JS/forms";
import ErrorModal from "../../../components/UI/JS/error_modal";

import { errorHandler } from "../../../actions/general/index";

//style
import styles from "../CSS/sign_in.module.css";

class SignIn extends Component {
	componentDidMount() {
		const tokenExpirationTime = localStorage.expiresIn;
		const fbLoggedInState = localStorage.fbLoggedIn;

		if (
			Date.now() < parseInt(tokenExpirationTime) ||
			fbLoggedInState === "true"
		) {
			if (document.referrer.match(`${window.location.host}/sign_up`))
				this.props.history.push("/");
			else window.history.back();
		}
	}

	signIn = async e => {
		try {
			const { email, password } = e;
			const request = await fetch(
				"https://backendapi.turing.com/customers/login",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: `email=${email}&password=${password}`
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

	fbLogin = () => {
		window.FB.login(response => {
			if (response.status === "connected") {
				localStorage.setItem("fbLoggedIn", true);
				console.log(response);
				fetch("https://backendapi.turing.com/customers/facebook", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: `access_token=${response.authResponse.accessToken}`
				})
					.then(res => {
						if (!res.ok) throw Error(res.statusText);
						return res.json();
					})
					.then(data => console.log(data))
					.catch(err => console.log(err.message));
			} else {
				alert("Log in attempt failed");
			}
		});
	};

	render() {
		const { showing, message } = this.props.errorModal;
		const { form } = this.props;
		const isTruthy =
			(form && !form.values) ||
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
					<p>or</p>
					<button className={styles.fb_login} onClick={this.fbLogin}>
						Log in with facebook
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	form: state.form.sign_in_form,
	errorModal: state.general.errorModal
});

const mapDispatchToProps = dispatch => ({
	errorHandler: (...args) => errorHandler(...args, dispatch)
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
		mapDispatchToProps
	)(SignIn)
);
