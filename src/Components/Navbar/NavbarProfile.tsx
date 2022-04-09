import { FC } from 'react'
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';

const NavbarProfile: FC<{
  userData: any,
  darkTheme: boolean
}> = ({
  userData,
  darkTheme
}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
    <div className="menu__profile" onClick={() => {
      navigate("/profile")
      dispatch({type: "MAKE_EMPTY_MESSAGE_HISTORY"})
      
      }}>
      <div className="profile-wrapper">
        <img src={userData.profile_src} alt="" draggable={false} />
      </div>
      <p className={darkTheme ? "menu__username dark" : "menu__username"}>
        {userData.username.length > 10 ? `${userData.username.slice(0, 10)}...` : userData.username}
      </p>
    </div>
    );
  }

export default NavbarProfile