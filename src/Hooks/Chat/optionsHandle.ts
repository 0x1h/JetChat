export type State = {
	message_author: string,
	message_id: string
	room_owner: string,
	message_username: string,
	message_text: string,
	message_profile: string
}

type Action = {
	type: "SET_OPTIONS_CONFIG",
	payload: State
}

const defaultt: State = {
	message_author: '',
	message_id: '',
	room_owner: '',
	message_username: '',
	message_text: "",
	message_profile: ""
}

export const optionsHandle = (state: State = defaultt, action: Action): State => {
	switch(action.type){
		case "SET_OPTIONS_CONFIG": {
			const {message_author, message_id, room_owner, message_username, 	message_text, message_profile} = action.payload

			return {
				message_author: message_author,
				message_id: message_id,
				room_owner: room_owner,
				message_username: message_username,
				message_text: message_text,
				message_profile: message_profile
			}
		}
		default: return state
	}
}