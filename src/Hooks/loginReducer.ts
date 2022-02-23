type State = {
	isLogined: boolean,
	username: string,
	user_picture: string
}

type Action = {
	type: string,
	payload: State
}

const defaultState: State = {
	isLogined: false,
	username: "",
	user_picture: ""
}

export const loginReducer = (state: State = defaultState, action: Action): State => {
	switch(action.type){
		case "USER_LOGINED": {
			return {
				...state,
				isLogined: true
			}
		}
		default: return state
	}
}