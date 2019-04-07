import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

//styles
import styles from '../CSS/category_list.module.css';

//actions
import { getProductsInCategory } from "../../../actions/general/index";

class CategoryList extends Component {
	state = {
		categories: null
	};

	componentDidMount() {
		fetch(
			`https://backendapi.turing.com/categories/inDepartment/${
				this.props.deptId
			}`
		)
			.then(res => res.json())
			.then(data => this.setState({ categories: data }))
			.catch(err => console.log(err));
	}

	clicked = (name, id) => {
		this.props.getProductsInCategory(id);
		this.props.history.push(`/${name}/products`);
	};

	render() {
		if (!this.state.categories) return <p>...</p>;
		return (
			<div className={styles.div}>
				{this.state.categories.map(category => (
					<div
						key={category.category_id}
						onClick={() =>
							this.clicked(category.name, category.category_id)
						}
						className={styles.name}
					>
						{category.name}
					</div>
				))}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		catId: state.general.productFindCatId
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			getProductsInCategory
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(CategoryList));
