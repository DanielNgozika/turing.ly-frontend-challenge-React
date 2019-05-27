import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import rootReducer from "./reducers/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

//components
import Homepage from "./containers/Homepage/JS/homepage";
import SignUp from "./containers/Users/JS/sign_up";
import SignIn from "./containers/Users/JS/sign_in";
import ProductsInCategory from "./containers/Homepage/JS/products_in_category";
import CartPage from "./containers/Cart/JS/cart_page";
import SearchResultsPage from "./containers/Homepage/JS/search_results_page";
import UserProfile from "./containers/Users/JS/profile";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = composeEnhancers()(createStore);

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route
					path="/:category/products"
					component={ProductsInCategory}
				/>
				<Route path="/profile" component={UserProfile} />
				<Route path="/search_results" component={SearchResultsPage} />
				<Route path="/sign_up" component={SignUp} />
				<Route path="/sign_in" component={SignIn} />
				<Route path="/cart" component={CartPage} />
				<Route exact path="/" component={Homepage} />
			</Switch>
		</BrowserRouter>
	);
};

ReactDOM.render(
	<Provider store={store(rootReducer)}>
		<App />
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
