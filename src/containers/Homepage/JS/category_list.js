import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//styles
import styles from "../CSS/category_list.module.css";

//actions
import {
	getProductsInCategory,
	errorHandler
} from "../../../actions/general/index";

class CategoryList extends PureComponent {
	state = {
		categories: null
	};

	async componentDidMount() {
		try {
			const request = await fetch(
				`https://backendapi.turing.com/categories/inDepartment/${
					this.props.deptId
				}`
			);
			if (!request.ok) {
				const error = await request.json();
				throw Error(error.error.message);
			}
			const data = await request.json();
			this.setState({ categories: data });
		} catch (err) {
			this.props.errorHandler(err);
		}
	}

	clicked = (name, id) => {
		this.props.clicked(name);
		const deviceWidth = window.innerWidth;
		if (deviceWidth < 900) {
			this.props.history.push(`/${name}/products`);
			this.props.getProductsInCategory(id, 1);
		} else {
			this.props.getProductsInCategory(id, 1);
		}
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
						className={
							this.props.active === category.name
								? styles.nameActive
								: styles.name
						}
					>
						{category.name}
					</div>
				))}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	getProductsInCategory: (...args) =>
		getProductsInCategory(dispatch, ...args),
	errorHandler: (...args) => errorHandler(...args, dispatch)
});

export default connect(
	null,
	mapDispatchToProps
)(withRouter(CategoryList));
