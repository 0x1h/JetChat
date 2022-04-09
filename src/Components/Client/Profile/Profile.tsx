import "./style/catalog_select.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ProfileAvatar from "./ProfileAvatar";
import UserRooms from "./UserRooms";

const Profile = () => {
  const navigate = useNavigate()
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

  return (
    <>
    <header className='catalog_select'>
      <div className={darkTheme ? "catalog dark selected" : "catalog selected"}>Profile</div>
      <div className={darkTheme ? "catalog dark" : "catalog "} onClick={() => navigate("/settings")}>Settings</div>
    </header>
    <ProfileAvatar />
    <UserRooms />
    </> 
  )
}

export default Profile