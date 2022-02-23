type Action = {
	type: "DARK" | "LIGHT"
}

export const themeReducer = (state: boolean = false, action: Action): boolean => {
	switch(action.type){
		case "DARK": 
			return true
		case "LIGHT":
			return false
		default: 
			return state
	}
}