export type State = {
  username: string,
  new_username: string
}

type Action = {
  type: "FILL_SETTINGS_USERNAME",
  payload: {
    key: string
    value: string
  }
}

const s: State = {
  username: '',
  new_username: ''
}

export const UsernameHandler = (state: State = s, action: Action): State => {
  switch(action.type){
    case "FILL_SETTINGS_USERNAME": {
      const {key, value} = action.payload

      return {
        ...state,
        [key]: value
      }
    }
    default: return state
  }
}