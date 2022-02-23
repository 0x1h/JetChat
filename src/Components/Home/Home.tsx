import { State } from "../../Hooks/modalsReducer"
import { useSelector, useDispatch } from "react-redux";
import AlertBox from './AlertBox'
import SignUp from "./Sign up/SignUp";
import "./style/style.css"

const Home = () => {
  const modals = useSelector((state: {modalReducer: State}) => state.modalReducer);
  const dispatch = useDispatch()

  const checkUserAuth = () => {
    const client_id = localStorage.getItem("client_id")
    const secret_token = sessionStorage.getItem("s_t")

    if(client_id === null || secret_token === null){
      dispatch({type: "NO_USER_ALERT", payload: true})
    }
  }

  return (
	<>
  {modals.signUp && <SignUp />}
  {modals.noUserAlert && <AlertBox />}
  <main>
    <h1>Connect With People</h1>
    <div className="btns-wrapper">
      <button onClick={() => {
        checkUserAuth()
      }}>Private room</button>
      <button onClick={() => {
        checkUserAuth()
      }}>Global Chat</button>
    </div>
  </main>
  </>
  )
}

export default Home