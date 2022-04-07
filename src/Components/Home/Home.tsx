import { useEffect, useState } from "react";
import { State } from "../../Hooks/Client/modalsReducer"
import { useSelector, useDispatch } from "react-redux";
import CreateRoom from "./Room Setup/CreateRoom";
import AlertBox from './AlertBox'
import SignUp from "./Sign up/SignUp";
import Login from "./Login/Login";
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti'
import "./style/style.css"

type UserSigned = 
| "no_pass"
| "room_create"
| "global"

const Home = () => {
  const modals = useSelector((state: {modalReducer: State}) => state.modalReducer);
  const [tada, setTada] = useState<boolean>(false)
  const [passUser, setPassUser] = useState<UserSigned>("no_pass")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight
  
  useEffect(() => {
    if(passUser === "global") {
      
    }
    if(passUser === "room_create") {
      dispatch({type: "PRIVATE_ROOM", payload: true})
    }
  }, [passUser])

  const checkUserAuth = (type: UserSigned) => {
    const client_id = localStorage.getItem("client_id")
    const secret_token = sessionStorage.getItem("s_t")

    if(client_id === null || secret_token === null){ 
      dispatch({type: "NO_USER_ALERT", payload: true})
      return
    }

    setPassUser(type)
  }

  return (
	<>
  {
    tada &&
    <Confetti 
    width={screenWidth}
    height={screenHeight}
    gravity={1}
    recycle={false}
    run={tada}
    onConfettiComplete={() => {
      setTada(false)
    }}
    />
  }
  {modals.privateRoom && <CreateRoom closeModal={() => setPassUser("no_pass")}/>}
  {modals.login && <Login />}
  {modals.signUp && <SignUp runTada={(arg: boolean) => setTada(arg)}/>}
  {modals.noUserAlert && <AlertBox />}
  <main>
    <h1>Connect With People</h1>
    <div className="btns-wrapper">
      <button onClick={() => checkUserAuth("room_create")}>Private room</button>
      <button onClick={() => checkUserAuth("global")}>
      <div className="box arrow-bottom">
        This feature is under the development 🔧
      </div>
        Random Person
      </button>
    </div>
  </main>
  </>
  )
}

export default Home