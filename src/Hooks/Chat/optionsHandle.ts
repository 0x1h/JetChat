export type State = {
	message_author: string,
	message_id: string
	room_owner: string
}

type Action = {
	type: "SET_OPTIONS_CONFIG",
	payload: {
		message_author: string,
		message_id: string
		room_owner: string
	}
}

const defaultt: State = {
	message_author: '',
	message_id: '',
	room_owner: ''
}

export const optionsHandle = (state: State = defaultt, action: Action): State => {
	switch(action.type){
		case "SET_OPTIONS_CONFIG": {
			const {message_author, message_id, room_owner} = action.payload
	
			return {
				message_author: message_author,
				message_id: message_id,
				room_owner: room_owner
			}
		}
		default: return state
	}
}