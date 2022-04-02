import { FC, useEffect } from "react";
import { State } from "../../../Hooks/Chat/RoomData";
import { useSelector, useDispatch } from "react-redux";
import { State as LoadState } from "../../../Hooks/Client/loadErrorHandle";
import {socket} from "../Room"
import axios from "axios";
import hostConfig from "../../../utils/hostconfig.json"
import "./style/messages.css";
import { useParams } from "react-router-dom";

const RoomHeader: FC<{ darkTheme: boolean }> = ({ darkTheme }) => {
  const roomData = useSelector((state: { roomData: State }) => state.roomData);
  const dispatch = useDispatch()
  const {roomId} = useParams()
  const isLoading = useSelector(
    (state: { loadErrHandler: LoadState }) => state.loadErrHandler
  );

  const alertUser = (e: BeforeUnloadEvent) => {
    const client_id = JSON.parse(localStorage.getItem("client_id")!)
    const authToken = JSON.parse(sessionStorage.getItem("s_t")!)
    const clientIsOwner: boolean = roomData.owner_data.client_id === client_id
    
    socket.emit("leave", roomId, client_id)
  

    // if(clientIsOwner){
    //   e.preventDefault()


    //   axios.put(`${hostConfig.host}/room/update_user/remove/${roomId}`, {
    //     authToken: authToken,
    //     requestor: client_id,
    //   })
    
    // }else if(!clientIsOwner){
    //   axios.put(`${hostConfig.host}/room/update_user/remove/${roomId}`, {
    //     authToken: authToken,
    //     requestor: client_id,
    //   })
    //   e.returnValue = ""
    // }
  }

  useEffect(() => {
    socket.on("room-changes-obj", (changes) => {
      dispatch({type: "CHANGE_ROOM", payload: {
        room_name: changes.room_name,
        room_icon: changes.room_icon
      }})
    })
  }, [])

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  })

  useEffect(() => {
    socket.on("transferShip-user", (user_data) => {
      dispatch({
        type: "NEW_OWNER",
        payload: {...user_data}
      })
    })
  })

  return (
    <header className={darkTheme ? "room-header dark" : "room-header"}>
      <div className="room__info">
        <div className="img-frame">
          {
						isLoading.status === "isLoading" ? 
						<div className="skeleton room-icon"></div>:
						<img src={roomData.room_icon} onClick={() => dispatch({type: "OPEN_SETTINGS"})} draggable={false}/>
					}
        </div>
        {isLoading.status === "isLoading" ? (
          <div className="skeleton"></div>
        ) : (
          <p className={darkTheme ? "room-name dark" : "room-name"} onClick={() => dispatch({type: "OPEN_SETTINGS"})}>
            {roomData.room_name}
          </p>
        )}
      </div>
      <div className="active__users-side"></div>
    </header>
  );
};

export default RoomHeader;
