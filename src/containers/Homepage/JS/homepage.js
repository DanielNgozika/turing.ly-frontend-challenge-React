import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
import ErrorModal from "../../../components/UI/JS/error_modal";
import ProductsOnCategoryClick from "./productsOnCategoryClick";
import SplashScreen from "../../../components/Homepage/JS/splash_screen";

//actions
import {
	openNavSidebar,
	clickBackDrop,
	openDeptSidebar,
	getCategories,
	getDepts,
	generateCartId,
	getShippingRegions,
	getShippingTypesPerRegion,
	removeSplashScreen
} from "../../../actions/general/index";

class Homepage extends Component {
	componentDidMount() {
		const {
			getCategories,
			getDepts,
			cartId,
			generateCartId,
			getShippingRegions,
			shippingRegions,
			categories,
			departments,
			splashScreenShowing,
			removeSplashScreen
		} = this.props;

		if (!categories) getCategories();

		if (!departments) getDepts();

		if (!cartId) {
			//the check makes sure that a new cart id isn't
			//generated after the component remounts

			//cart id is generated here to make it available early enough
			//seeing as Homepage is the first component to mount.
			generateCartId();
		}

		if (splashScreenShowing) {
			setTimeout(() => removeSplashScreen(), 6000);
		}
		//fetching the shipping regions make them available for the cart
		//and provides smooth UI update when the cart component gets mounted
		if (shippingRegions.length === 0) getShippingRegions();
	}

	componentDidUpdate(prevProps) {
		if (this.props.shippingRegions !== prevProps.shippingRegions) {
			const filtered = this.props.shippingRegions.filter(
				r => r.shipping_region_id !== 1
			);
			filtered.map(region =>
				this.props.getShippingTypesPerRegion(region.shipping_region_id)
			);
		}
	}

	searchIconClick() {
		let searchInput = document.querySelector(
			".search_product_form_input__3hB0a"
		);
		let searchInputWider = document.querySelector(
			".search_product_form_input__109dd"
		);
		if (searchInput === null) searchInputWider.focus();
		else searchInput.focus();
	}

	showCategories = () => {
		if (this.props.categories) {
			return this.props.categories.rows.map((each, i) => {
				return i < 8 ? (
					<EachCategoryDiv category={each} key={i} />
				) : null;
			});
		} else {
			return <Spinner id={styles.spinnerPos} />;
		}
	};

	render() {
		const { showing, message } = this.props.errorModal;
		const { showingProducts, splashScreenShowing } = this.props;
		return (
			<>
				{splashScreenShowing ? <SplashScreen /> : null}
				{showing ? (
					<ErrorModal
						message={message}
						show={showing ? true : false}
					/>
				) : null}
				<Toolbar hamburgerClick={this.props.openNavSidebar}>
					<Link className={styles.nav_item} to={"/sign_up"}>
						SIGN UP
					</Link>
					<Link className={styles.nav_item} to={"/sign_in"}>
						SIGN IN
					</Link>
				</Toolbar>
				{window.innerWidth < 900 ? (
					<>
						<LeftSidedrawer
							open={this.props.deptSidebarOpen ? true : false}
							onClick={this.props.clickBackDrop}
						>
							<DeptsSideNav />
						</LeftSidedrawer>
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
					</>
				) : null}
				<div className={styles.left_nav}>
					<DeptsSideNav />
				</div>
				<div className={styles.body}>
					<section className={styles.left_side}>
						<div className={styles.empty} />
					</section>
					<section className={styles.right_side}>
						{showingProducts && window.innerWidth >= 900 ? (
							<>
								<ProductsOnCategoryClick />
								<footer className={styles.footer}>
									&copy; Copyright, 2019 Daniel Ngozika
								</footer>
							</>
						) : (
							<>
								<Banner />
								{this.showCategories()}
								<footer className={styles.footer}>
									&copy; Copyright, 2019 Daniel Ngozika
								</footer>
							</>
						)}
					</section>
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
						icon={<i className="fas fa-search" />}
						onClick={this.searchIconClick}
					/>
					{localStorage.fbLoggedIn === "true" ||
					Date.now() < localStorage.expiresIn ? (
						<ButtNavItem
							icon={<i className="fas fa-user" />}
							onClick={() => this.props.history.push("/profile")}
						/>
					) : null}
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
		shippingRegions: state.general.shippingRegions,
		errorModal: state.general.errorModal,
		showingProducts: state.general.rightSideCategoryProductsShowing,
		departments: state.general.departments,
		splashScreenShowing: state.general.splashScreenShowing
	};
}

const mapDispatchToProps = dispatch => {
	return {
		openNavSidebar: () => dispatch(openNavSidebar()),
		clickBackDrop: () => dispatch(clickBackDrop()),
		openDeptSidebar: () => dispatch(openDeptSidebar()),
		getCategories: () => getCategories(dispatch),
		getDepts: () => getDepts(dispatch),
		generateCartId: () => generateCartId(dispatch),
		getShippingRegions: () => getShippingRegions(dispatch),
		getShippingTypesPerRegion: (...args) =>
			getShippingTypesPerRegion(dispatch, ...args),
		removeSplashScreen: () => dispatch(removeSplashScreen())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Homepage);
