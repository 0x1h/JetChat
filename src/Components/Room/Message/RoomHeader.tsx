import { FC, useEffect } from "react";
import { State } from "../../../Hooks/Chat/RoomData";
import { useSelector, useDispatch } from "react-redux";
import { State as LoadState } from "../../../Hooks/Client/loadErrorHandle";
import {socket} from "../../../App"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import "./style/messages.css";

const RoomHeader: FC<{ darkTheme: boolean }> = ({ darkTheme }) => {
  const roomData = useSelector((state: { roomData: State }) => state.roomData);
  const dispatch = useDispatch()
  const isLoading = useSelector(
    (state: { loadErrHandler: LoadState }) => state.loadErrHandler
  );

  useEffect(() => {
    socket.on("room-changes-obj", (changes) => {
      dispatch({type: "CHANGE_ROOM", payload: {
        room_name: changes.room_name,
        room_icon: changes.room_icon
      }})
    })
  }, [])

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
            {roomData.room_name.length > 20 ? `${roomData.room_name.slice(0, 20)}...` : roomData.room_name}
          </p>
        )}
      </div>
      <div className="active__users-side" onClick={() => {
        dispatch({type: "TOGGLE_MEMBER"})
      }}>
          <FontAwesomeIcon icon={faUserGroup} color={darkTheme ? "#FFF" : "#b22ab5"} style={{
            position: "absolute",
            right: 0,
            transform: "translate(-20px, 15px)",
            cursor: "pointer",
            zIndex: 32
          }}/>
      </div>
    </header>
  );
};

export default RoomHeader;
