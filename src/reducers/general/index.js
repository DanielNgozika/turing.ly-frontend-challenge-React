const initialState = {
	navSidebarOpen: false,
	deptSidebarOpen: false,
	backdropVisible: false,
	categories: null,
	departments: null,
	productsInCategory: null,
	productDetailedId: null,
	cartId: null,
	productIdAttrModalOpen: null,
	cartItemCount: 0
};

export default function(state = initialState, action) {
	switch (action.type) {
		case "OPEN_NAV_SIDEBAR":
			return {
				...state,
				navSidebarOpen: true,
				backdropVisible: true
			};
		case "CLICK_BACKDROP":
			return {
				...state,
				navSidebarOpen: state.navSidebarOpen ? false : false,
				deptSidebarOpen: state.deptSidebarOpen ? false : false,
				productDetailedId: state.productDetailedId ? null : null,
				productIdAttrModalOpen: state.productIdAttrModalOpen
					? null
					: null,
				backdropVisible: false
			};
		case "OPEN_DEPT_SIDEBAR":
			return {
				...state,
				deptSidebarOpen: true,
				backdropVisible: true
			};
		case "GET_CATEGORIES":
			return {
				...state,
				categories: action.payload
			};
		case "GET_DEPTS":
			return {
				...state,
				departments: action.payload
			};
		case "GET_PRODUCTS_IN_CATEGORY":
			return {
				...state,
				productsInCategory: action.payload.rows
			};
		case "PRODUCT_DETAIL":
			return {
				...state,
				productDetailedId: action.payload,
				backdropVisible: true
			};
		case "GENERATE_CART_ID":
			return {
				...state,
				cartId: action.payload.cart_id
			};
		case "SHOW_ATTR_MODAL":
			return {
				...state,
				productDetailedId: null,
				productIdAttrModalOpen: action.payload
			};
		case "ADD_TO_CART":
			return {
				...state,
				cartItemCount: state.cartItemCount + 1
			};

		default:
			return state;
	}
}
