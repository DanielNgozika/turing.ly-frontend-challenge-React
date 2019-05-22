import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "../CSS/profile.module.css";

//components
import PersonalEditForm from "./personal_edit_form";
import LocationEditForm from "./location_edit_form";

//actions
import {
	showPersonalEditForm,
	showLocationEditForm,
	hideLocationEditForm,
	hidePersonalEditForm
} from "../../../actions/general/index";

class Profile extends Component {
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
		return (
			<div className={styles.div}>
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
						{day_phone === null ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{day_phone}</p>
						)}
						<span className={styles.title}>Evening Phone</span>
						{eve_phone === null ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{eve_phone}</p>
						)}
						<span className={styles.title}>Mobile Phone</span>
						{mob_phone === null ? (
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
						{address_1 === null ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{address_1}</p>
						)}
						<span className={styles.title}>Address 2</span>
						{address_2 === null ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{address_2}</p>
						)}
						<span className={styles.title}>City</span>
						{city === null ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{city}</p>
						)}
						<span className={styles.title}>Region</span>
						{region === null ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{region}</p>
						)}
						<span className={styles.title}>Country</span>
						{country === null ? (
							<span className={styles.not}>not yet set</span>
						) : (
							<p>{country}</p>
						)}
						<span className={styles.title}>Shipping region</span>
						{shipping_region_id === null ? (
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
	showingLocationEditForm: state.general.showingLocationEditForm
});

const mapDispatchToProps = {
	showPersonalEditForm,
	showLocationEditForm,
	hideLocationEditForm,
	hidePersonalEditForm
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
