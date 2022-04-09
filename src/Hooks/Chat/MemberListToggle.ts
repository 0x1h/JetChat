type Action = {
	type: "TOGGLE_MEMBER" | "TOGGLE_MEMBER_FALSE"
}

export const memberToggler = (state: boolean = false, action: Action): boolean => {
	switch(action.type){
    case "TOGGLE_MEMBER": return !state
    case "TOGGLE_MEMBER_FALSE": return false
    default: return state
  }
}