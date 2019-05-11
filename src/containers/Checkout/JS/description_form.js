import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

import { renderTextArea } from "../../../components/UI/JS/forms";

//styles
import styles from "../CSS/description_form.module.css";

class DescriptionForm extends Component {
	render() {
		return (
			<form className={styles.form}>
				<Field
					name="description"
					component={renderTextArea}
					rows="2"
					placeholder="Enter description"
					className={styles.input}
					autoFocus
				/>
			</form>
		);
	}
}

export default reduxForm({
	form: "description_form"
})(DescriptionForm);
