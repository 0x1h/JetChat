import { themeReducer } from "./themeReducer";
import { loginReducer } from "./loginReducer";
import { signReducer } from "./signReducer";
import { combineReducers } from "redux"
import { modalReducer } from "./modalsReducer";
import { userDataHandler } from "./userDataHandler";
import { loadErrHandler } from "./loadErrorHandle";

export const allReducers = combineReducers({
	themeReducer: themeReducer,
	loginReducer: loginReducer,
	signReducer: signReducer,
	modalReducer: modalReducer,
	userData: userDataHandler,
	loadErrHandler: loadErrHandler
})