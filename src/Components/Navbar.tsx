import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {State} from "../Hooks/Client/userDataHandler"
import { useNavigate } from "react-router-dom";
import Moon_icon from "./style/icons/moon-icon.png";
import hostConfig from "../utils/hostconfig.json"
import Sun_icon from "./style/icons/sun-icon.png";
import "./style/navbar__style.css";
import axios from "axios";


const Navbar = () => {
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const userData = useSelector(
    (state: { userData: State }) => state.userData
  );
  const settingsRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate()
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
  

  const logOutHandle = () => {
    localStorage.removeItem("client_id")
    sessionStorage.removeItem("s_t")
  
    dispatch({
      type: "FILL_USER",
      payload: {
        username: '',
        client_id: '',
        createdAt: '',
        profile_src: '',
        isLogined: false
      },
    });
  }
  

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const client_id = localStorage.getItem("client_id");
    const secret_token = sessionStorage.getItem("s_t");

    if (client_id !== null || secret_token !== null) {
      axios
        .post(`${hostConfig.host}/user/${JSON.parse(client_id!)}`, {
          authToken: JSON.parse(secret_token!),
          requestor: JSON.parse(client_id!),
        })
        .then((data) => {
          const { profile_src, createdAt, username, client_id } = data.data;

          dispatch({
            type: "FILL_USER",
            payload: {
              username: username,
              client_id: client_id,
              createdAt: createdAt,
              profile_src: profile_src,
              isLogined: true
            },
          });
        })
        .catch(error => {
          const {err} = error.response.data

          if(err === "User not found" || err === "Invalid Authentiction" || err==="Invalid arguments"){
            localStorage.removeItem("client_id")
            sessionStorage.removeItem("s_t")
          }
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
    const body = document.querySelector(".body") as HTMLBodyElement

    if (darkTheme) {
      localStorage.setItem("theme", JSON.stringify(true));
      return body.classList.add("dark"); 
    }

    body.classList.remove("dark");
    localStorage.setItem("theme", JSON.stringify(false));
  }, [darkTheme]);

  return (
    <nav>
      <div className="logo-wrapper" onClick={() => navigate("/")}>
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
          {
            userData.isLogined ?
            <div className="menu__profile">
              <div className="profile-wrapper">
                <img src={userData.profile_src} alt="" />
              </div>
              <p className={darkTheme ? "menu__username dark" : "menu__username"}>
                {userData.username.length > 10 ? `${userData.username.slice(0, 10)}...`: userData.username}
              </p>
            </div> :
            <button
            className={darkTheme ? "menu__button dark" : "menu__button"}
            onClick={() => {
              dispatch({ type: "LOG_IN", payload: true });
              setToggleSettings(false);
            }}
          >
            Log in
          </button>
          }
          {
            userData.isLogined ?
            <button className="menu__logout" onClick={logOutHandle}>Log out</button> :
            <button
            className={darkTheme ? "menu__button dark" : "menu__button"}
            onClick={() => {
              dispatch({ type: "SIGN_UP", payload: true });
              setToggleSettings(false);
            }}
          >
            Sign up
          </button>
          }
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
