import { State } from "../../../Hooks/createRoomReducer";
import { useSelector, useDispatch } from "react-redux";
import EmptyIcon from "./Icon/server-icon.png";

const ServerIcon = () => {
  const roomData = useSelector(
    (state: { roomState: State }) => state.roomState
  );
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

  const dispatch = useDispatch()

  return (
    <div className="avatar-frame" onClick={() => dispatch({type: "IMG_MODAL", payload: true})}>
      <div className={darkTheme ? "avatar dark" : "avatar"}>
        {!roomData.room_icon.trim() ? (
          <img src={EmptyIcon} alt="camera-icon" className="camera-icon"/>
        ) : (
          <img src={roomData.room_icon.trim()} alt="profile-pic" className="profile-pic"/>
        )}
				{!roomData.room_icon.trim() && "Upload Profile Picture"}
      </div>
    </div>
  );
};

export default ServerIcon;
