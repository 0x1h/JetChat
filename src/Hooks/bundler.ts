import { themeReducer } from "./themeReducer";
import { loginReducer } from "./loginReducer";
import { signReducer } from "./signReducer";
import { combineReducers } from "redux"
import { modalReducer } from "./modalsReducer";

export const allReducers = combineReducers({
	themeReducer: themeReducer,
	loginReducer: loginReducer,
	signReducer: signReducer,
	modalReducer: modalReducer
})