const initialState = {
	splashScreenShowing: true,
	navSidebarOpen: false,
	deptSidebarOpen: false,
	backdropVisible: false,
	categories: null,
	departments: null,
	productsInCategory: null,
	productDetailedId: null,
	cartId: null,
	productIdAttrModalOpen: null,
	cart: [],
	cartItemIdUpdated: null,
	itemRemoveNoticeModalOpen: null,
	emptyCartWarningModal: false,
	shippingRegions: [],
	shippingTypesPerRegion: {},
	checkoutModalShowing: false,
	searchResults: null,
	showingPersonalEditForm: false,
	showingLocationEditForm: false,
	errorModal: {
		showing: false,
		message: null
	},
	rightSideCategoryProductsShowing: false,
	categoryActive: null,
	searchQuery: null
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
				backdropVisible: false,
				itemRemoveNoticeModalOpen: state.itemRemoveNoticeModalOpen
					? null
					: null,
				emptyCartWarningModal: state.emptyCartWarningModal
					? false
					: false,
				checkoutModalShowing: state.checkoutModalShowing ? false : false
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
				categoryActive: action.catId,
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

		//CART
		case "ADD_TO_CART":
			return {
				...state,
				cart: action.payload
			};
		case "GET_CART_ITEMS":
			return {
				...state,
				cart: action.payload
			};
		case "UPDATE_CART_ITEM":
			const { itemId, qty } = action.payload;
			return {
				...state,
				cart: state.cart.map(i =>
					i.item_id === itemId
						? { ...i, quantity: qty, subtotal: qty * i.price }
						: i
				)
			};
		case "REMOVE_CART_ITEM":
			const ID = action.payload;
			return {
				...state,
				cart: state.cart.filter(i => i.item_id !== ID),
				backdropVisible: false
			};
		case "EMPTY_CART":
			return {
				...state,
				cart: []
			};
		case "SHOW_CART_ITEM_UPDATE_FORM":
			return {
				...state,
				cartItemIdUpdated: action.payload
			};
		case "SHOW_REMOVE_NOTICE_MODAL":
			return {
				...state,
				backdropVisible: true,
				itemRemoveNoticeModalOpen: action.payload
			};
		case "REMOVE_CART_ITEM_EDIT_FORM":
			return {
				...state,
				cartItemIdUpdated: null
			};
		case "SHOW_EMPTY_CART_WARNING":
			return {
				...state,
				backdropVisible: true,
				emptyCartWarningModal: true
			};
		case "GET_SHIPPING_REGIONS":
			return {
				...state,
				shippingRegions: action.payload
			};
		case "GET_SHIPPING_TYPES_PER_REGION":
			let regionId = action.payload[0].shipping_region_id;
			return {
				...state,
				shippingTypesPerRegion: {
					...state.shippingTypesPerRegion,
					[regionId]: action.payload
				}
			};
		case "SHOW_CHECKOUT_MODAL":
			return {
				...state,
				backdropVisible: true,
				checkoutModalShowing: true
			};
		case "SEARCH_PRODUCTS":
			return {
				...state,
				searchResults: action.payload
			};
		case "SHOW_PERSONAL_EDIT_FORM":
			return {
				...state,
				showingPersonalEditForm: true
			};
		case "HIDE_PERSONAL_EDIT_FORM":
			return {
				...state,
				showingPersonalEditForm: false
			};
		case "SHOW_LOCATION_EDIT_FORM":
			return {
				...state,
				showingLocationEditForm: true
			};
		case "HIDE_LOCATION_EDIT_FORM":
			return {
				...state,
				showingLocationEditForm: false
			};
		case "SHOW_ERROR_MODAL":
			return {
				...state,
				errorModal: {
					showing: true,
					message: action.message
				}
			};
		case "HIDE_ERROR_MODAL":
			return {
				...state,
				errorModal: {
					showing: false,
					message: null
				}
			};
		case "SHOW_RIGHTSIDE_PRODUCTS":
			return { ...state, rightSideCategoryProductsShowing: true };
		case "REMOVE_SPLASH_SCREEN":
			return {
				...state,
				splashScreenShowing: false
			};
		case "SET_SEARCH_QUERY":
			return {
				...state,
				searchQuery: action.payload
			};

		default:
			return state;
	}
}
