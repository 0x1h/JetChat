import { FC, useEffect } from "react";
import { State } from "../../../Hooks/Chat/RoomData";
import { useSelector, useDispatch } from "react-redux";
import { State as LoadState } from "../../../Hooks/Client/loadErrorHandle";
import "./style/messages.css";

const RoomHeader: FC<{ darkTheme: boolean }> = ({ darkTheme }) => {
  const roomData = useSelector((state: { roomData: State }) => state.roomData);
  const dispatch = useDispatch()
  const isLoading = useSelector(
    (state: { loadErrHandler: LoadState }) => state.loadErrHandler
  );

  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    
    e.returnValue = "are you sure u want leave?"
  }

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  })

  return (
    <header className={darkTheme ? "room-header dark" : "room-header"}>
      <div className="room__info">
        <div className="img-frame">
          {
						isLoading.status === "isLoading" ? 
						<div className="skeleton room-icon"></div>:
						<img src={roomData.room_icon} onClick={() => dispatch({type: "OPEN_SETTINGS"})}/>
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
