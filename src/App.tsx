import Router from "./Router/Router"
import {createStore} from "redux"

import { allReducers } from "./Hooks/bundler"
import {Provider} from "react-redux"

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
