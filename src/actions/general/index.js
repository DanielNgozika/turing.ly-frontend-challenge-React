const url = "https://backendapi.turing.com";

export const openNavSidebar = () => {
	return {
		type: "OPEN_NAV_SIDEBAR"
	};
};

export const clickBackDrop = () => {
	return {
		type: "CLICK_BACKDROP"
	};
};

export const openDeptSidebar = () => {
	return {
		type: "OPEN_DEPT_SIDEBAR"
	};
};

export const getCategories = async dispatch => {
	try {
		const request = await fetch(`${url}/categories`);
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		const data = await request.json();
		dispatch({
			type: "GET_CATEGORIES",
			payload: data
		});
	} catch (err) {
		errorHandler(err, dispatch);
	}
};

export const getDepts = async dispatch => {
	try {
		const request = await fetch(`${url}/departments`);
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		const data = await request.json();
		dispatch({
			type: "GET_DEPTS",
			payload: data
		});
	} catch (err) {
		errorHandler(err, dispatch);
	}
};

export const getProductsInCategory = async (dispatch, catId, page) => {
	dispatch(showRightSideCategoryProducts());
	try {
		const request = await fetch(
			`${url}/products/inCategory/${catId}?page=${page}`
		);
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		const data = await request.json();
		dispatch({
			type: "GET_PRODUCTS_IN_CATEGORY",
			catId,
			payload: data
		});
	} catch (err) {
		errorHandler(err, dispatch);
	}
};

export const showProductDetail = productId => ({
	type: "PRODUCT_DETAIL",
	payload: productId
});

export const generateCartId = async dispatch => {
	try {
		const request = await fetch(`${url}/shoppingcart/generateUniqueId`);
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		const data = await request.json();
		dispatch({
			type: "GENERATE_CART_ID",
			payload: data
		});
	} catch (err) {
		errorHandler(err, dispatch);
	}
};

export const showAttrModal = productId => ({
	type: "SHOW_ATTR_MODAL",
	payload: productId
});

export const addToCart = async (dispatch, cart_id, product_id, attributes) => {
	try {
		const request = await fetch(`${url}/shoppingcart/add`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `cart_id=${cart_id}&product_id=${product_id}&attributes=${attributes}`
		});
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		const cart = await request.json();
		dispatch({
			type: "ADD_TO_CART",
			payload: cart
		});
	} catch (err) {
		errorHandler(err, dispatch);
	}
};

export const showCartItemUpdateForm = itemId => ({
	type: "SHOW_CART_ITEM_UPDATE_FORM",
	payload: itemId
});

export const updateCartItem = async (dispatch, itemId, qty) => {
	try {
		const payload = { itemId, qty };
		const request = await fetch(`${url}/shoppingcart/update/${itemId}`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `quantity=${qty}`
		});
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		dispatch({
			type: "UPDATE_CART_ITEM",
			payload: payload
		});
	} catch (err) {
		errorHandler(err, dispatch);
	}
};

export const removeCartitemEditForm = () => ({
	type: "REMOVE_CART_ITEM_EDIT_FORM"
});

export const removeCartItem = async (dispatch, itemId) => {
	try {
		const request = await fetch(
			`${url}/shoppingcart/removeProduct/${itemId}`,
			{
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}
		);
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		dispatch({
			type: "REMOVE_CART_ITEM",
			payload: itemId
		});
	} catch (err) {
		errorHandler(err, dispatch);
	}
};

export const showRemoveNoticeModal = itemId => ({
	type: "SHOW_REMOVE_NOTICE_MODAL",
	payload: itemId
});

export const showEmptyCartWarning = () => ({
	type: "SHOW_EMPTY_CART_WARNING"
});

export const emptyCart = async (dispatch, cartId) => {
	try {
		const request = await fetch(`${url}/shoppingcart/empty/${cartId}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded"
			}
		});
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		dispatch({ type: "EMPTY_CART" });
	} catch (err) {
		errorHandler(err, dispatch);
	}
};

export const getShippingRegions = async dispatch => {
	try {
		const request = await fetch(`${url}/shipping/regions`);
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		const regions = await request.json();
		dispatch({
			type: "GET_SHIPPING_REGIONS",
			payload: regions
		});
	} catch (err) {
		errorHandler(err, dispatch);
	}
};

export const getShippingTypesPerRegion = async (dispatch, regionID) => {
	try {
		const request = await fetch(`${url}/shipping/regions/${regionID}`);
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		const shippingTypes = await request.json();
		dispatch({
			type: "GET_SHIPPING_TYPES_PER_REGION",
			payload: shippingTypes
		});
	} catch (err) {
		errorHandler(err, dispatch);
	}
};

export const showCheckoutModal = () => ({
	type: "SHOW_CHECKOUT_MODAL"
});

export const searchProducts = async (dispatch, query, page) => {
	try {
		const request = await fetch(
			`${url}/products/search?query_string=${query}&page=${page}`
		);
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		const result = await request.json();
		dispatch({
			type: "SEARCH_PRODUCTS",
			payload: result
		});
	} catch (err) {
		errorHandler(err, dispatch);
	}
};

export const setSearchQuery = query => ({
	type: "SET_SEARCH_QUERY",
	payload: query
});

export const hidePersonalEditForm = () => ({
	type: "HIDE_PERSONAL_EDIT_FORM"
});

export const showPersonalEditForm = () => ({
	type: "SHOW_PERSONAL_EDIT_FORM"
});

export const showLocationEditForm = () => ({
	type: "SHOW_LOCATION_EDIT_FORM"
});

export const hideLocationEditForm = () => ({
	type: "HIDE_LOCATION_EDIT_FORM"
});

export const showErrorModal = message => ({
	type: "SHOW_ERROR_MODAL",
	message
});

export const hideErrorModal = () => ({
	type: "HIDE_ERROR_MODAL"
});

export const showRightSideCategoryProducts = () => ({
	type: "SHOW_RIGHTSIDE_PRODUCTS"
});

export const removeSplashScreen = () => ({
	type: "REMOVE_SPLASH_SCREEN"
});

export const errorHandler = async (err, dispatch) => {
	if (err.message === "Failed to fetch") {
		dispatch(
			showErrorModal("Connection lost. Check your network and retry.")
		);
		await setTimeout(() => dispatch(hideErrorModal()), 3000);
	} else {
		dispatch(showErrorModal(`${err.message}`));
		await setTimeout(() => dispatch(hideErrorModal()), 3000);
	}
};
