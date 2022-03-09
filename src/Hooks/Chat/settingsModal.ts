type Action = {
	type: "CLOSE_SETTINGS" | "OPEN_SETTINGS"
}

export const settingsModal = (state: boolean = false, action: Action): boolean => {
	switch(action.type){
		case "CLOSE_SETTINGS": {
			return false
		}
		case "OPEN_SETTINGS": {
			return true
		}
		default: return state
	}
}