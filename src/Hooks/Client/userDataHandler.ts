export type State = {
	username: string,
	client_id: string,
	createdAt: string,
	profile_src: string,
	isLogined: boolean
}

type Action = {
	type: "FILL_USER" | "CLEAR_ALL_THE_DATA" | "SPECIFIC_KEY_UPDATE",
	payload: {
		username: string,
		client_id: string,
		createdAt: string,
		profile_src: string,
		isLogined: boolean,
		key?: string ,
		value?: string
	}
}

const defaultState: State = {
	username: '',
	client_id: '',
	createdAt: '',
	profile_src: '',
	isLogined: false
}

export const userDataHandler = (state: State = defaultState, action: Action): State => {
	switch(action.type){
		
		case "FILL_USER": {
			const {username, client_id, createdAt, profile_src, isLogined} = action.payload

			return {
				username: username,
				client_id: client_id,
				createdAt: createdAt,
				profile_src: profile_src,
				isLogined: isLogined
			}
		}case "CLEAR_ALL_THE_DATA": {
			return defaultState
		}
		case "SPECIFIC_KEY_UPDATE": {
			const {key, value} = action.payload
			
			return {
				...state,
				[key!]: value
			}
		}
		default: return state
	}
}