export type State = {
	profile_src: string,
	username: string,
	password: string,
	repeat_password: string
}

const defaultState: State = {
	username: '',
	profile_src: '',
	password: '',
	repeat_password: ''
}

type Action = {
	type: "INPUT_FIELD",
	payload: {
		key: keyof State,
		value: string
	}
}

export const signReducer = (state: State = defaultState, action: Action) => {
	
	switch(action.type){
		case "INPUT_FIELD": {
			const {key, value} = action.payload
 
			return {
				...state,
				[key]: value
			}
		}

		default: return state
	}
}
