import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavbarProfile from "./NavbarProfile"
import { State } from "../../Hooks/Client/userDataHandler";
import { useNavigate } from "react-router-dom";
import hostConfig from "../../utils/hostconfig.json";
import ThemeSwitcher from "./ThemeSwitcher"
import "../style/navbar__style.css";
import axios from "axios";

const Navbar = () => {
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const userData = useSelector((state: { userData: State }) => state.userData);
  const settingsRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //detect if user clicks outside of settings <div>
  const handleClickOutside = (event: any): void => {
    if (settingsRef.current && !settingsRef.current!.contains(event.target)) {
      setToggleSettings(false);
    }
  };

  const imageContext = (e: MouseEvent) => e.preventDefault()

  useEffect(() => {
    settingsRef.current?.addEventListener("contextmenu", imageContext)

    return () => settingsRef.current?.removeEventListener("contextmenu", imageContext)
  })

  //fire "handleClickOutside()"
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const logOutHandle = () => {
    localStorage.removeItem("client_id");
    sessionStorage.removeItem("s_t");

    navigate("/")

    dispatch({type: 'MAKE_SETTINGS_EMPTY'})
    dispatch({
      type: "FILL_USER",
      payload: {
        username: "",
        client_id: "",
        createdAt: "",
        profile_src: "",
        isLogined: false,
      },
    });
  };

  useEffect(() => {
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
              isLogined: true,
            },
          });
        })
        .catch((error) => {
          const { err } = error.response.data;

          if (
            err === "User not found" ||
            err === "Invalid Authentiction" ||
            err === "Invalid arguments"
          ) {
            localStorage.removeItem("client_id");
            sessionStorage.removeItem("s_t");
          }
        });
    }

    const theme = localStorage.getItem("theme");

    //Creating localStorage if dark theme doesn't exist
    theme === null && localStorage.setItem("theme", JSON.stringify(false));

    //setting to dark theme if localStorage is set on -> (TRUE)
    if (JSON.parse(theme!)) {
      dispatch({ type: "DARK" });
    }
  }, []);

  useEffect(() => {
    const body = document.querySelector(".body") as HTMLBodyElement;

    if (darkTheme) {
      localStorage.setItem("theme", JSON.stringify(true));
      return body.classList.add("dark");
    }

    body.classList.remove("dark");
    localStorage.setItem("theme", JSON.stringify(false));
  }, [darkTheme]);

  return (
    <nav>
      <div className="logo-wrapper" onClick={() => navigate("/")} ref={settingsRef}>
        <div className="logo">
          <img src="/assets/jetchat-icon.png" alt="" draggable={false}/>
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
          {userData.isLogined ? (
            <NavbarProfile darkTheme={darkTheme} userData={userData} />
          ) : (
            <button
              className={darkTheme ? "menu__button dark" : "menu__button"}
              onClick={() => {
                dispatch({ type: "LOG_IN", payload: true });
                setToggleSettings(false);
              }}
            >
              Log in
            </button>
          )}
          {userData.isLogined ? (
            <button className="menu__logout" onClick={logOutHandle}>
              Log out
            </button>
          ) : (
            <button
              className={darkTheme ? "menu__button dark" : "menu__button"}
              onClick={() => {
                dispatch({ type: "SIGN_UP", payload: true });
                setToggleSettings(false);
              }}
            >
              Sign up
            </button>
          )}
          <ThemeSwitcher darkTheme={darkTheme} />
        </div>
      )}
    </nav>
  );
};
export default Navbar