

export type State = {
	signUp: boolean
	noUserAlert: boolean
	privateRoom: boolean
	imageModal: boolean,
	login: boolean
}

const defaultState: State = {
	signUp: false,
	noUserAlert: false,
	privateRoom: false,
	imageModal: false,
	login: false
}

type Action = {
	type: "SIGN_UP" | "NO_USER_ALERT" | "PRIVATE_ROOM" | "LOG_IN",
	payload: boolean
} 

export const modalReducer = (state: State = defaultState, action: Action): State => {
	switch(action.type){
		case "SIGN_UP": {
			return {
				...state,
				signUp: action.payload
			}
		}
		case "NO_USER_ALERT": {
			return {
				...state,
				noUserAlert: action.payload
			}
		}
		case "PRIVATE_ROOM": {
			return {
				...state,
				privateRoom: action.payload
			}
		}
		case "LOG_IN": {
			return {
				...state,
				login: action.payload
			}
		}
		default: 
			return state
	}
}