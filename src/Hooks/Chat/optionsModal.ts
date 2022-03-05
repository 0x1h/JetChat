type Action = {
	type: "CLOSE_OPTIONS" | "OPEN_OPTIONS",
	payload: {
		open: boolean
		x: number,
		y: number
	}
}	

export type State = {
	open: boolean,
	x: number;
	y: number;
}

const d: State = {
	open: false,
	x: 0,
	y: 0
}

export const optionModal = (state: State = d, action: Action): State => {
	switch(action.type){
		case "CLOSE_OPTIONS": {
			return {
				...state,
				open: false,	
			}
		}
		case "OPEN_OPTIONS": {
			return {
				open: true,
				x: action.payload.x,
				y: action.payload.y
			}
		}
		default: return state
	}
}