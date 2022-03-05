import { useState, FC, useEffect, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../Hooks/Client/loadErrorHandle";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import hostConfig from "../../../utils/hostconfig.json"

const JoinRoom:FC<{goBack: () => void}> = ({goBack}) => {
  const [input, setInput] = useState<string>("");
	const dispatch = useDispatch()
	const navigate = useNavigate()
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
	const loadErrHandler = useSelector(
		(state: {loadErrHandler: State}) => state.loadErrHandler)
	
		useEffect(() => {
			dispatch({ type: "DEFAULT"})
		}, [input])

	const checkRoomExist = (e: FormEvent) => {
		e.preventDefault()
		if(!input.trim()) return

		dispatch({ type: "LOAD"})
		const client_id = JSON.parse(localStorage.getItem("client_id")!)
    const authToken = JSON.parse(sessionStorage.getItem("s_t")!)

		axios.post(`${hostConfig.host}/room/join/${input.trim()}`, {
			authToken: authToken,
			requestor: client_id,
		}).then(data => {
			if(data.data.room_id){
				dispatch({ type: "DEFAULT"})
				navigate(`/room/${input.trim()}`)
			}
		}).catch(error => {
			const { err } = error.response.data;
			
			if(err === "room not found"){
				dispatch({ type: "ERROR", payload: "Room not found, inputed code is incorect"})
			}

			})
	}

  return (
    <form className={"join__in-private"} >
      <div className="join-room_wrapper">
        <p className={darkTheme ? "goback dark" : "goback"} onClick={goBack}>{"<"} Go back</p>
        <h3 className={darkTheme ? "join_in_room dark" : "join_in_room"}>
          Join in Room
        </h3>
      </div>
      <input
        type="text"
        className={darkTheme ? "join__input dark" : "join__input"}
        placeholder="Room Code"
        onChange={(e) => setInput(e.target.value)}
				value={input}
      />
			<button className="join_room_btn" onClick={checkRoomExist} type="submit">{
				loadErrHandler.status === "isLoading" ? <span className="loaderr"></span> : "Join"
			}</button>
			{
				loadErrHandler.status === "isError" && <div className="join_error">
					{loadErrHandler.msg}
				</div>
			}
    </form>
  );
};

export default JoinRoom;
