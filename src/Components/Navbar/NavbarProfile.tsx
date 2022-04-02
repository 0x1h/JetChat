import { FC } from 'react'

const NavbarProfile: FC<{
  userData: any,
  darkTheme: boolean
}> = ({
  userData,
  darkTheme
}) => {
    return (<div className="menu__profile">
      <div className="profile-wrapper">
        <img src={userData.profile_src} alt="" draggable={false} />
      </div>
      <p className={darkTheme ? "menu__username dark" : "menu__username"}>
        {userData.username.length > 10 ? `${userData.username.slice(0, 10)}...` : userData.username}
      </p>
    </div>);
  }

export default NavbarProfile