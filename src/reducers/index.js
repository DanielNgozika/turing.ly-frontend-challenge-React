import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import general from "./general/index";

const rootReducer = combineReducers({
	form: formReducer,
	general
});

export default rootReducer;
