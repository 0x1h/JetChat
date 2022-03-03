export type State = {
	room_name: string,
	room_icon: string,
	room_code: string
}

type Action = {
	type: "ROOM_OPTIONS" | "CLEAR_ROOM_OPTIONS",
	payload: {
		key: keyof State,
		value: string
	}
}

const room: State = {
	room_name: "",
	room_icon: "",
	room_code: "",
}

export const createRoomReducer = (state: State = room, action: Action): State => {
	switch(action.type){
		case "ROOM_OPTIONS": {
			const {key, value} = action.payload	
			return {
				...state,
				[key]: value
			}
		}
		case "CLEAR_ROOM_OPTIONS": {
			return {
				room_name: "",
				room_icon: "",
				room_code: "",
			}
		}
		default: return state
	}	
}
