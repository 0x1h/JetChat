export type State = {
	username: string,
	password: string,
}

type Action = {
	type: string,
	payload: {
		key: keyof State,
		value: string | boolean
	}
}

const defaultState: State = {
	username: "",
	password: "",
}

export const loginReducer = (state: State = defaultState, action: Action): State => {
	switch(action.type){
		case "LOGIN_FILL": {
			const {key, value} = action.payload

			return {
				...state,
				[key]: value
			}
		}
		
		default: return state
	}
}