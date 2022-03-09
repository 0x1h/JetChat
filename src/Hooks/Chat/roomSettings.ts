export type State = {
	specific: "OVERVIEW" | "MEMBERS" | "BANS",
}

type Action = {
	type: "CHANGE_SPECIFIC"	,
	payload: "OVERVIEW" | "MEMBERS" | "BANS"
}

const statee: State = {
	specific: "OVERVIEW"
} 

export const roomSpecific = (state: State = statee, action: Action): State => {
	switch(action.type){
		case "CHANGE_SPECIFIC": {
			return {
				specific: action.payload
			}
		}
		default: return state
	}
}