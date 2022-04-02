export type State = {
	room_id: string,
	room_name: string,
	room_icon: string,
	owner_data: {
		client_id: string,
		client_name: string,
		client_profile: string
	}
	active_clients: {
		client_id: string,
		client_name: string,
		client_profile: string
	}[]
}

const roomDefault: State = {
	room_id: '',
	room_name: '',
	room_icon: '',
	owner_data: {
		client_id: '',
		client_name: '',
		client_profile: ''		
	},
	active_clients: [],
}

type ActionType = "LOAD_ROOM_DATA" | "ROOM_BAN_ADD" | "ROOM_BAN_REMOVE" | "ROOM_MEMBER_UPDATE" | "ROOM_MEMBER_REMOVE" | "NEW_OWNER"| "CHANGE_ROOM" | "SET_ONLINE_MEMBERS"
type ActionPayload = {
	ip?: string,
	client_id?: string,
	client_name?: string,
	client_profile?: string
	room_name?: string,
	room_icon?: string,
	room_id?: string
	active_clients: {
		client_id: string,
		client_name: string,
		client_profile: string
	}[],
	owner_data: {
		client_id: string,
		client_name: string,
		client_profile: string
	}
}

type Action = {
	type: ActionType,
	payload: ActionPayload
}



export const roomInfo = (state: State = roomDefault, action: Action): State => {
	switch(action.type){
		//LOAD ROOM DATA
		case "LOAD_ROOM_DATA": {
			const {room_icon, room_id, room_name, owner_data, active_clients} = action.payload
			
			return {
				room_id: room_id!,
				room_name: room_name!,
				room_icon: room_icon!,
				owner_data: owner_data,
				active_clients: active_clients,
			}
		}
		//WHEN OWNER GIVES NEW MEMBER OWNERHOST
		case "NEW_OWNER" : {
			const {client_id, client_name, client_profile} = action.payload
			
			return {
				...state,
				owner_data: {
					client_id: client_id!,
					client_name: client_name!,
					client_profile: client_profile!		
				},
			}
		}
		//MEMBER LEAVES ROOM
		case "ROOM_MEMBER_REMOVE": {
			const {client_id} = action.payload

			const memberLeft = state.active_clients.filter(e => e.client_id !== client_id)
			
			return {
				...state,
				active_clients: memberLeft
			}
		}
		case "SET_ONLINE_MEMBERS": {
			const {active_clients} = action.payload

			return {
				...state,
				active_clients: active_clients
			}
		}
		//MEMBER JOINS ROOM	
		case "ROOM_MEMBER_UPDATE": {
			const {client_id, client_name, client_profile} = action.payload
			const duplicateUser = state.active_clients.some(e => e.client_id === client_id)

			if(duplicateUser) return state

			return {
				...state,
				active_clients: [
					...state.active_clients,
					{
						client_id: client_id!,
						client_name: client_name!,
						client_profile: client_profile!
					}
				]
			}
		}
		case "CHANGE_ROOM": {
			return {
				...state,
				room_name: action.payload.room_name!,
				room_icon: action.payload.room_icon!
			}
		}
		default: return state
	}
}