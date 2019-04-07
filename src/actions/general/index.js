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
	fetch("https://backendapi.turing.com/shoppingcart/add", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: `cart_id=${cart_id}&product_id=${product_id}&attributes=${attributes}`
	})
		.then(res => {
			if (!res.ok) {
				throw Error("Something went wrong", res.status);
			}
		})
		.catch(err => alert(`${err}`));

	return {
		type: "ADD_TO_CART"
	};
};
