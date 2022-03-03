export type State = {
	username: string,
	profile_src: string,
	createdAt: string,
	client_id: string
	message: string
}

type Action = {
	type: "SET_USER" | "MESSAGE_INPUT" | "CLEAR_MESSAGE_FIELD",
	payload: {
		username: string,
		profile_src: string,
		createdAt: string,
		client_id: string,
		message: string
	}
}

const clientState: State = {
	username: '',
	profile_src: '',
	createdAt: '',
	client_id: '',
	message: ''
}

export const clientReducer = (state: State = clientState, action: Action): State => {
	
	switch(action.type){
		case "SET_USER": {
			const {username, profile_src, createdAt, client_id} = action.payload
			return {
				...state,
				username: username,
				profile_src: profile_src,
				createdAt: createdAt,
				client_id: client_id,
			}
		}case "MESSAGE_INPUT": {
			const {message} = action.payload
			return {
				...state,
				message: message
			}
		}
		case "CLEAR_MESSAGE_FIELD": {
			return {
				...state,
				message: ""
			}
		}
		default: return state
	}
}