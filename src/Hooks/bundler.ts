import { themeReducer } from "./Client/themeReducer";
import { loginReducer } from "./Client/loginReducer";
import { signReducer } from "./Client/signReducer";
import { modalReducer } from "./Client/modalsReducer";
import { createRoomReducer } from "./Client/createRoomReducer";
import { userDataHandler } from "./Client/userDataHandler";
import { loadErrHandler } from "./Client/loadErrorHandle";
import { clientReducer } from "./Chat/ClientReducer";
import { allMessages } from "./Chat/ChatMessages";
import { optionModal } from "./Chat/optionsModal";
import { roomInfo } from "./Chat/RoomData";
import { optionsHandle } from "./Chat/optionsHandle"
import { settingsModal } from "./Chat/settingsModal";
import { roomSpecific } from "./Chat/roomSettings";
import { PhotoHandler } from "./Settings/Photohandler";
import { UsernameHandler } from "./Settings/Usernamehandler"
import { menuToggler } from "./Chat/MenuCloseOpen";
import { combineReducers } from "redux"

export const allReducers = combineReducers({
	themeReducer: themeReducer,
	loginReducer: loginReducer,
	signReducer: signReducer,
	modalReducer: modalReducer,
	userData: userDataHandler,
	loadErrHandler: loadErrHandler,
	roomState: createRoomReducer,
	chatData: clientReducer,
	sentMessages: allMessages,
	roomData: roomInfo,
	optionModal: optionModal,
	optionsHandle: optionsHandle,
	roomSpecific: roomSpecific,
	settingsModal: settingsModal,
	PhotoHandler: PhotoHandler,
	UsernameHandler: UsernameHandler,
	menu: menuToggler
})