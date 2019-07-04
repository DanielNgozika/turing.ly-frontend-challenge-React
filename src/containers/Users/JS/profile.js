import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "../CSS/profile.module.css";

//components
import PersonalEditForm from "./personal_edit_form";
import LocationEditForm from "./location_edit_form";
import ErrorModal from "../../../components/UI/JS/error_modal";

//actions
import {
	showPersonalEditForm,
	showLocationEditForm,
	hideLocationEditForm,
	hidePersonalEditForm,
	getShippingRegions
} from "../../../actions/general/index";

class Profile extends Component {
	componentDidMount() {
		if (this.props.shippingRegions.length === 0)
			this.props.getShippingRegions();
	}

	render() {
		const {
			name,
			email,
			eve_phone,
			mob_phone,
			day_phone,
			address_1,
			address_2,
			city,
			postal_code,
			region,
			country,
			shipping_region_id
		} = JSON.parse(localStorage.userData);

		const {
			showingPersonalEditForm,
			showPersonalEditForm,
			showingLocationEditForm,
			showLocationEditForm,
			hideLocationEditForm,
			hidePersonalEditForm
		} = this.props;
		const { showing, message } = this.props.errorModal;
		return (
			<div className={styles.div}>
				{showing ? (
					<ErrorModal
						message={message}
						show={showing ? true : false}
					/>
				) : null}
				<header className={styles.header}>
					<i
						className="fas fa-arrow-left"
						onClick={() => window.history.go(-1)}
					/>
					<h4>Profile</h4>
				</header>
				<div className={styles.sect_header}>
					<h3>Personal</h3>
					{showingPersonalEditForm ? (
						<span onClick={() => hidePersonalEditForm()}>
							cancel edit
						</span>
					) : (
						<span onClick={() => showPersonalEditForm()}>Edit</span>
					)}
				</div>
				{showingPersonalEditForm ? (
					<PersonalEditForm />
				) : (
					<section className={styles.section}>
						<span className={styles.title}>Name</span>
						<p>{name}</p>
						<span className={styles.title}>Email</span>
						<p>{email}</p>
						<span className={styles.title}>Day Phone</span>
						{day_phone === null || day_phone === "null" ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{day_phone}</p>
						)}
						<span className={styles.title}>Evening Phone</span>
						{eve_phone === null || eve_phone === "null" ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{eve_phone}</p>
						)}
						<span className={styles.title}>Mobile Phone</span>
						{mob_phone === null || mob_phone === "null" ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{mob_phone}</p>
						)}
					</section>
				)}

				<div className={styles.sect_header}>
					<h3>Location</h3>
					{showingLocationEditForm ? (
						<span onClick={() => hideLocationEditForm()}>
							cancel edit
						</span>
					) : (
						<span onClick={() => showLocationEditForm()}>Edit</span>
					)}
				</div>
				{showingLocationEditForm ? (
					<LocationEditForm />
				) : (
					<section className={styles.section_2}>
						<span className={styles.title}>Address 1</span>
						{address_1 === null || address_1 === "null" ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{address_1}</p>
						)}
						<span className={styles.title}>Address 2</span>
						{address_2 === null || address_2 === "null" ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{address_2}</p>
						)}
						<span className={styles.title}>City</span>
						{city === null || city === "null" ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{city}</p>
						)}
						<span className={styles.title}>Region</span>
						{region === null || region === "null" ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{region}</p>
						)}
						<span className={styles.title}>Postal code</span>
						{postal_code === null || postal_code === "null" ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{postal_code}</p>
						)}
						<span className={styles.title}>Country</span>
						{country === null || country === "null" ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{country}</p>
						)}
						<span className={styles.title}>Shipping region</span>
						{shipping_region_id === null ||
						shipping_region_id === "null" ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{shipping_region_id}</p>
						)}
					</section>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	showingPersonalEditForm: state.general.showingPersonalEditForm,
	showingLocationEditForm: state.general.showingLocationEditForm,
	shippingRegions: state.general.shippingRegions,
	errorModal: state.general.errorModal
});

const mapDispatchToProps = dispatch => ({
	showPersonalEditForm: () => dispatch(showPersonalEditForm()),
	showLocationEditForm: () => dispatch(showLocationEditForm()),
	hideLocationEditForm: () => dispatch(hideLocationEditForm()),
	hidePersonalEditForm: () => dispatch(hidePersonalEditForm()),
	getShippingRegions: () => getShippingRegions(dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
