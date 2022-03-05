export type State = {
	username: string,
	profile_src: string,
	createdAt: string,
	client_id: string
	message: string,
	message_id: string
}

type Action = {
	type: "SET_USER" | "MESSAGE_INPUT" | "CLEAR_MESSAGE_FIELD" | "SET_MESSAGE_ID",
	payload: {
		username: string,
		profile_src: string,
		createdAt: string,
		client_id: string,
		message: string,
		message_id: string
	}
}

const clientState: State = {
	username: '',
	profile_src: '',
	createdAt: '',
	client_id: '',
	message: '',
	message_id: ''
}

export const clientReducer = (state: State = clientState, action: Action): State => {
	
	switch(action.type){
		case "SET_USER": {
			const {username, message_id, profile_src, createdAt, client_id} = action.payload
			return {
				...state,
				username: username,
				profile_src: profile_src,
				createdAt: createdAt,
				client_id: client_id,
				message_id: message_id
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
		case "SET_MESSAGE_ID": {
			return {
				...state,
				message_id: action.payload.message_id
			}
		}
		default: return state
	}
}