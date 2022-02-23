import { themeReducer } from "./themeReducer";
import {combineReducers} from "redux"

export const allReducers = combineReducers({
	themeReducer: themeReducer
})