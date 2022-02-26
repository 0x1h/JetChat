type State = {
	status: "isLoading" | "isError" | "default"
	msg: string
}

type Action = {
	type: "LOAD" | "ERROR" | "DEFAULT",
	payload: string
}

const defaultState: State = {
	status: "default",
	msg: ""
}

export const loadErrHandler = (state: State = defaultState, action: Action): State => {
	switch(action.type){
		case "ERROR" : {
			return {
				status: "isError",
				msg: action.payload
			}
		}
		case "LOAD": {
			return {
				status: "isLoading",
				msg: ""
			}
		}
		case "DEFAULT": {
			return {
				status: "default",
				msg: ""
			}
		}
		default: {
			return state
		}
	}
}