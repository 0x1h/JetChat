import { useState } from "react";
import { State } from "../../Hooks/modalsReducer"
import { useSelector, useDispatch } from "react-redux";
import AlertBox from './AlertBox'
import SignUp from "./Sign up/SignUp";
import Login from "./Login/Login";
import Confetti from 'react-confetti'
import "./style/style.css"

const Home = () => {
  const modals = useSelector((state: {modalReducer: State}) => state.modalReducer);
  const [tada, setTada] = useState<boolean>(false)
  const dispatch = useDispatch()
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight

  const checkUserAuth = () => {
    const client_id = localStorage.getItem("client_id")
    const secret_token = sessionStorage.getItem("s_t")

    if(client_id === null || secret_token === null){
      dispatch({type: "NO_USER_ALERT", payload: true})
    }
  }

  return (
	<>
  {
    tada &&
    <Confetti 
    width={screenWidth}
    height={screenHeight}
    colors={["#FA00FF", "#161955"]}
    gravity={1}
    recycle={false}
    run={tada}
    onConfettiComplete={() => {
      setTada(false)
    }}
    />
  }
  {modals.login && <Login />}
  {modals.signUp && <SignUp runTada={(arg: boolean) => setTada(arg)}/>}
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