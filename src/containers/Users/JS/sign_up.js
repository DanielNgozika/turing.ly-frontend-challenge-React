import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { renderInputField } from "../../../components/UI/JS/forms";

//style
import styles from "../CSS/sign_in.module.css";

class SignUp extends Component {
	render() {
		return (
			<div className={styles.div}>
				<h1>Sign Up</h1>
				<form className={styles.form}>
					<Field
						name="full name"
						type="text"
						placeholder="full name"
						className={styles.input}
						component={renderInputField}
					/>
					<Field
						name="email"
						type="email"
						placeholder="enter email"
						className={styles.input}
						component={renderInputField}
					/>
					<Field
						name="password"
						type="password"
						placeholder="enter password"
						className={styles.input}
						component={renderInputField}
					/>
					<button type="submit">Sign Up</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch);
}

export default reduxForm({
	form: "sign in form"
})(
	connect(
		null,
		mapDispatchToProps
	)(SignUp)
);
