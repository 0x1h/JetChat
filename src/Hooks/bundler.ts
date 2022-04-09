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
import { memberToggler } from "./Chat/MemberListToggle";
import { combineReducers } from "redux"

export const allReducers = combineReducers({
	menu: menuToggler,
	userData: userDataHandler,
	roomState: createRoomReducer,
	chatData: clientReducer,
	sentMessages: allMessages,
	roomData: roomInfo,
	themeReducer,
	loginReducer,
	signReducer,
	modalReducer,
	loadErrHandler,
	optionModal,
	optionsHandle,
	roomSpecific,
	settingsModal,
	PhotoHandler,
	UsernameHandler,
	memberToggler
})