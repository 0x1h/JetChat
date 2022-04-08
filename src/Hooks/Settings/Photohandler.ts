export type State = {
  profile_src: string,
  new_profile_src: string
}

type Action = {
  type: "FILL_SETTINGS_DATA" | "MAKE_SETTINGS_EMPTY",
  payload: {
    key: string
    value: string
  }
}

const s: State = {
  profile_src: "",
  new_profile_src: "",
}

export const PhotoHandler = (state: State = s, action: Action): State => {
  switch(action.type){
    case "FILL_SETTINGS_DATA": {
      const {key, value} = action.payload

      return {
        ...state,
        [key]: value
      }
    }
    case "MAKE_SETTINGS_EMPTY": return s
    default: return state
  }
}