import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//style
import styles from "../CSS/homepage.module.css";

//components
import Toolbar from "../../../components/Homepage/JS/Toolbar/top_toolbar";
import ButtNavItem from "../../../components/Homepage/JS/Toolbar/butt_nav_item";
import Backdrop from "../../../components/UI/JS/top_backdrop";
import LeftSidedrawer from "../../../components/UI/JS/left_side_drawer";
import RightSidedrawer from "../../../components/UI/JS/right_side_drawer";
import ButtToolbar from "../../../components/Homepage/JS/Toolbar/bottom_toolbar";
import { CategoryIcon } from "../../../components/UI/JS/icons";
import NavigationItems from "../../../components/Homepage/JS/Toolbar/navigation_items";
import NavigationItem from "../../../components/Homepage/JS/Toolbar/navigation_item";
import Banner from "../../../components/Homepage/JS/banner";
import Spinner from "../../../components/UI/JS/spinner";
import EachCategoryDiv from "./each_category_div";
import DeptsSideNav from "./depts_side_nav";
import CartCounter from "./cart_counter";

//actions
import {
	openNavSidebar,
	clickBackDrop,
	openDeptSidebar,
	getCategories,
	getDepts,
	generateCartid,
	getShippingRegions,
	getShippingTypesPerRegion
} from "../../../actions/general/index";

class Homepage extends Component {
	componentDidMount() {
		this.props.getCategories();
		this.props.getDepts();
		if (!this.props.cartId) {
			//the check makes sure that a new cart id isn't
			//generated after the component remounts

			//cart id is generated here to make it available early enough
			//seeing as Homepage is the first component to mount.
			this.props.generateCartid();
		}
		//fetching the shipping regions make them available for the cart
		//and provides smooth UI update when the cart component gets mounted
		this.props.getShippingRegions();
	}

	componentDidUpdate(prevProps) {
		if (this.props.shippingRegions !== prevProps.shippingRegions)  {
			const filtered = this.props.shippingRegions.filter(r => r.shipping_region_id !== 1);
			filtered.map(region => (
				this.props.getShippingTypesPerRegion(region.shipping_region_id)
			))
		}
	}

	searchIconClick() {
		let searchInput = document.querySelector(
			".search_product_form_input__3hB0a"
		);
		searchInput.focus();
	}

	showCategories = () => {
		if (this.props.categories) {
			return this.props.categories.rows.map((each, i) => {
				return i < 8 ? (
					<EachCategoryDiv category={each} key={i} />
				) : null;
			});
		} else {
			return <Spinner id={styles.spinnerPos}/>;
		}
	};

	render() {
		return (
			<>
				<Toolbar hamburgerClick={this.props.openNavSidebar} />
				<Banner />
				<div className={styles.body}>
					<>
						<LeftSidedrawer
							open={this.props.deptSidebarOpen ? true : false}
							onClick={this.props.clickBackDrop}
						>
							<DeptsSideNav />
						</LeftSidedrawer>
					</>
					<>
						<RightSidedrawer
							open={this.props.navSidebarOpen ? true : false}
							onClick={this.props.clickBackDrop}
						>
							<NavigationItems>
								<NavigationItem to="/" itemName="Home" />
								<NavigationItem
									to="/sign_up"
									itemName="Sign Up"
								/>
								<NavigationItem
									to="/sign_in"
									itemName="Sign In"
								/>
							</NavigationItems>
						</RightSidedrawer>
						<section className={styles.categories}>
							{this.showCategories()}
						</section>
					</>
				</div>
				{this.props.backdropVisible ? (
					<Backdrop onClick={this.props.clickBackDrop} />
				) : null}
				<CartCounter />
				<ButtToolbar>
					<ButtNavItem
						buttName="department"
						icon={
							<i>
								<CategoryIcon />
							</i>
						}
						onClick={this.props.openDeptSidebar}
					/>
					<ButtNavItem
						buttName="search"
						icon={<i className="fas fa-search" />}
						onClick={this.searchIconClick}
					/>
				</ButtToolbar>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		backdropVisible: state.general.backdropVisible,
		navSidebarOpen: state.general.navSidebarOpen,
		deptSidebarOpen: state.general.deptSidebarOpen,
		categories: state.general.categories,
		cartId: state.general.cartId,
		shippingRegions: state.general.shippingRegions
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			openNavSidebar,
			clickBackDrop,
			openDeptSidebar,
			getCategories,
			getDepts,
			generateCartid,
			getShippingRegions,
			getShippingTypesPerRegion
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Homepage);
