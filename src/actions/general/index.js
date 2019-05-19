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

export const getCategories = () => {
	const request = fetch(`${url}/categories`)
		.then(response => response.json())
		.catch(err => console.log(err.message));

	return {
		type: "GET_CATEGORIES",
		payload: request
	};
};

export const getDepts = () => {
	const request = fetch(`${url}/departments`)
		.then(response => response.json())
		.catch(err => console.log(err.message));

	return {
		type: "GET_DEPTS",
		payload: request
	};
};

export const getProductsInCategory = catId => {
	const request = fetch(`${url}/products/inCategory/${catId}`)
		.then(res => res.json())
		.catch(err => console.log(err.message));

	return {
		type: "GET_PRODUCTS_IN_CATEGORY",
		payload: request
	};
};

export const showProductDetail = productId => ({
	type: "PRODUCT_DETAIL",
	payload: productId
});

export const generateCartid = () => {
	const request = fetch(`${url}/shoppingcart/generateUniqueId`)
		.then(res => res.json())
		.catch(err => console.log(err.message));

	return {
		type: "GENERATE_CART_ID",
		payload: request
	};
};

export const showAttrModal = productId => ({
	type: "SHOW_ATTR_MODAL",
	payload: productId
});

export const addToCart = (cart_id, product_id, attributes) => {
	const cart = fetch(`${url}/shoppingcart/add`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: `cart_id=${cart_id}&product_id=${product_id}&attributes=${
			attributes.attributes
		}`
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}
			throw new Error("Something went wrong", res.status);
		})
		.then(data => data)
		.catch(err => alert(`${err}`));

	return {
		type: "ADD_TO_CART",
		payload: cart
	};
};

export const showCartItemUpdateForm = itemId => ({
	type: "SHOW_CART_ITEM_UPDATE_FORM",
	payload: itemId
});

export const updateCartItem = (itemId, qty) => {
	const payload = { itemId, qty };
	fetch(`${url}/shoppingcart/update/${itemId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: `quantity=${qty}`
	});

	return {
		type: "UPDATE_CART_ITEM",
		payload
	};
};

export const removeCartitemEditForm = () => ({
	type: "REMOVE_CART_ITEM_EDIT_FORM"
});

export const removeCartItem = itemId => {
	fetch(`${url}/shoppingcart/removeProduct/${itemId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});

	return {
		type: "REMOVE_CART_ITEM",
		payload: itemId
	};
};

export const showRemoveNoticeModal = itemId => ({
	type: "SHOW_REMOVE_NOTICE_MODAL",
	payload: itemId
});

export const showEmptyCartWarning = () => ({
	type: "SHOW_EMPTY_CART_WARNING"
});

export const emptyCart = cartId => {
	fetch(`${url}/shoppingcart/empty/${cartId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});

	return {
		type: "EMPTY_CART"
	};
};

export const getShippingRegions = () => {
	const regions = fetch(`${url}/shipping/regions
	`)
		.then(res => {
			if (res.ok) return res;

			throw new Error("Something went wrong");
		})
		.then(data => data.json())
		.catch(err => console.log(err));

	return {
		type: "GET_SHIPPING_REGIONS",
		payload: regions
	};
};

export const getShippingTypesPerRegion = regionID => {
	const shippingTypes = fetch(`${url}/shipping/regions/${regionID}`)
		.then(res => {
			if (res.ok) return res;

			throw new Error("Something went wrong");
		})
		.then(data => data.json())
		.catch(err => console.log(err));

	return {
		type: "GET_SHIPPING_TYPES_PER_REGION",
		payload: shippingTypes
	};
};

export const showCheckoutModal = () => ({
	type: "SHOW_CHECKOUT_MODAL"
});

export const searchProducts = (query) => {
	const result = fetch(`${url}/products/search?query_string=${query}`)
	.then(res => {
		if (res.ok) return res;

		throw new Error("Something went wrong");
	})
	.then(data => data.json())
	.catch(err => console.log(err));

	return {
		type: 'SEARCH_PRODUCTS',
		payload: result
	}
}

export const hidePersonalEditForm = () => ({
	type: 'HIDE_PERSONAL_EDIT_FORM'
})

export const showPersonalEditForm = () => ({
	type: "SHOW_PERSONAL_EDIT_FORM"
})
