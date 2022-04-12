import Router from "./Router/Router"
import {createStore} from "redux"
import { allReducers } from "./Hooks/bundler"
import hostConfig from "./utils/hostconfig.json";
import { io } from "socket.io-client";
import {Provider} from "react-redux"

const { host } = hostConfig;
export const socket = io(host);

const store = createStore(
  allReducers
)

function App() {
  return (
    <Provider store={store}>
        <Router/>
    </Provider>
  )
} 

export default App;
