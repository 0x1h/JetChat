import { State } from "../../../Hooks/Client/signReducer";
import { useSelector, useDispatch } from "react-redux";
import CameraIcon from "./icons/camera-icon.png";

const ProfilePicture = () => {
  const form = useSelector(
    (state: { signReducer: State }) => state.signReducer
  );
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

  const dispatch = useDispatch()

  return (
    <div className="avatar-frame" onClick={() => dispatch({type: "IMG_MODAL", payload: true})}>
      <div className={darkTheme ? "avatar dark" : "avatar"}>
        {!form.profile_src.trim() ? (
          <img src={CameraIcon} alt="camera-icon" className="camera-icon"/>
        ) : (
          <img src={form.profile_src.trim()} alt="profile-pic" className="profile-pic"/>
        )}
				{!form.profile_src.trim() && "Upload Profile Picture"}
      </div>
    </div>
  );
};

export default ProfilePicture;
