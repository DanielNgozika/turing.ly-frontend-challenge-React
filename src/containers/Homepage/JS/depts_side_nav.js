import React, { Component } from "react";
import { connect } from "react-redux";

//style
import styles from "../CSS/depts_side_nav.module.css";

import CategoryList from "./category_list";

class DeptsSideNav extends Component {
	state = {
		categoryActive: null
	};

	categoryClicked = name => this.setState({ categoryActive: name });

	render() {
		if (!this.props.depts) return <p>loading...</p>;
		return (
			<section className={styles.section}>
				{this.props.depts.map(dept => (
					<div key={dept.department_id} className={styles.div}>
						<h4>{dept.name}</h4>
						<CategoryList
							deptId={dept.department_id}
							clicked={this.categoryClicked}
							active={this.state.categoryActive}
						/>
					</div>
				))}
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		depts: state.general.departments
	};
}

export default connect(
	mapStateToProps,
	null
)(DeptsSideNav);
