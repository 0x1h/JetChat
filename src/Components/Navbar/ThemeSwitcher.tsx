import {FC} from "react"
import { useDispatch } from 'react-redux';
import Moon_icon from "../style/icons/moon-icon.png";
import Sun_icon from "../style/icons/sun-icon.png"


const ThemeSwitcher: FC<{darkTheme: boolean}> = ({darkTheme}) => {
  const dispatch = useDispatch()

  return (
    <div
      className="dark-theme__toggler-btn"
      onClick={() => {
        dispatch({ type: darkTheme ? "LIGHT" : "DARK" });
      }}
    >
      <div className={`theme-dragger ${darkTheme}`} />
      <img
        src={Moon_icon}
        alt="moon-icon"
        className={
          !darkTheme ? "menu-icon moon hidden" : "menu-icon moon"
        }
      />
      <img
        src={Sun_icon}
        alt="sun-icon"
        className={darkTheme ? "menu-icon sun hidden" : "menu-icon sun"}
      />
    </div>
  )
}

export default ThemeSwitcher