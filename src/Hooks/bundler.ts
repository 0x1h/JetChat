import { themeReducer } from "./themeReducer";
import { loginReducer } from "./loginReducer";
import { signReducer } from "./signReducer";
import { modalReducer } from "./modalsReducer";
import { createRoomReducer } from "./createRoomReducer";
import { userDataHandler } from "./userDataHandler";
import { loadErrHandler } from "./loadErrorHandle";
import { combineReducers } from "redux"

export const allReducers = combineReducers({
	themeReducer: themeReducer,
	loginReducer: loginReducer,
	signReducer: signReducer,
	modalReducer: modalReducer,
	userData: userDataHandler,
	loadErrHandler: loadErrHandler,
	roomState: createRoomReducer
})