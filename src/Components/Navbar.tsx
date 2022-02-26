import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moon_icon from "./style/icons/moon-icon.png";
import Sun_icon from "./style/icons/sun-icon.png";
import "./style/navbar__style.css";
import axios from "axios"

const Navbar = () => {
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);
  const darkTheme = useSelector((state: {themeReducer: boolean}) => state.themeReducer);
  const settingsRef = useRef<HTMLDivElement>(null);
  const [signed, setSigned] = useState<boolean>(false)

  const dispatch = useDispatch();

  //detect if user clicks outside of settings <div>
  const handleClickOutside = (event: any): void => {
    if (settingsRef.current && !settingsRef.current!.contains(event.target)) {
      setToggleSettings(false);
    }
  };

  //fire "handleClickOutside()"
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const client_id = localStorage.getItem("client_id");
    const secret_token = sessionStorage.getItem("s_t");

    if (client_id !== null || secret_token !== null) {
      dispatch({ type: "USER_LOGINED" });
    }else{
      axios.post(`http://localhost:3001/user/${JSON.parse(client_id!)}`, {
        authToken: JSON.parse(secret_token!),
        requestor: JSON.parse(client_id!)
    })
      .then(data => {
        console.log(data.data);
      })
    }

    //Creating localStorage if dark theme doesn't exist
    theme === null && localStorage.setItem("theme", JSON.stringify(false));

    //setting to dark theme if localStorage is set on -> (TRUE)
    if (JSON.parse(theme!)) {
      dispatch({ type: "DARK" });
    }
  }, []);

  useEffect(() => {
    const body = document.querySelector(".body");

    if (darkTheme) {
      localStorage.setItem("theme", JSON.stringify(true));
      body?.classList.add("dark");
      return;
    }

    body?.classList.remove("dark");
    localStorage.setItem("theme", JSON.stringify(false));
  }, [darkTheme]);

  return (
    <nav>
      <div className="logo-wrapper">
        <div className="logo">
          <img src="/assets/jetchat-icon.png" alt="" />
        </div>
        JetChat
      </div>
      <div className="settings__stick" onClick={() => setToggleSettings(true)}>
        <div
          className={
            !toggleSettings ? "stick-wrapper one" : "stick-wrapper one toggled"
          }
        ></div>
        <div
          className={
            !toggleSettings ? "stick-wrapper two" : "stick-wrapper two toggled"
          }
        ></div>
      </div>
      {toggleSettings && (
        <div
          className={!darkTheme ? "dropped__menu" : "dropped__menu dark"}
          ref={settingsRef}
        >
          <button className={darkTheme ? "menu__button dark" : "menu__button"}
          onClick={() => {
            dispatch({ type: "LOG_IN", payload: true })
            setToggleSettings(false)
            }}>
            Log in
          </button>
          <button
            className={darkTheme ? "menu__button dark" : "menu__button"}
            onClick={() => {
              dispatch({ type: "SIGN_UP", payload: true })
              setToggleSettings(false)
            }}
          >
            Sign up
          </button>
          <div
            className="dark-theme__toggler-btn"
            onClick={() => {
              dispatch({ type: darkTheme ? "LIGHT" : "DARK" })
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
