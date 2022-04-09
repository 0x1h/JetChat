type Action = {
	type: "TOGGLE"
}

export const menuToggler = (state: boolean = false, action: Action): boolean => {
	switch(action.type){
    case "TOGGLE": return !state
    default: return state
  }
}