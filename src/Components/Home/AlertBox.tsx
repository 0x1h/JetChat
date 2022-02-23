import { useEffect, FC, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import Typewriter from "typewriter-effect";
import "./style/alert__style.css";


const AlertBox = () => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const dispatch = useDispatch()

  const [appear, setAppear] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);

  const variants = {
    visible: { opacity: appear ? 1 : 0, y: appear ? 0 : 50 },
    hidden: { opacity: 0, y: appear ? 0 : -200 },
  };

  //detect if user clicks outside of settings <div>
  const handleClickOutside = (event: any): void => {
    if (alertRef.current && !alertRef.current!.contains(event.target)) {
      dispatch({type: "NO_USER_ALERT", payload: false})
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
    let timeout = setTimeout(() => {
      setAppear(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="alert-container">
      <motion.div
        className={!darkTheme ? "alert-wrapper" : "alert-wrapper dark"}
        ref={alertRef}
        variants={variants}
        animate="visible"
        transition={{ ease: "easeOut", duration: 0.4 }}
        initial="hidden"
      >
        <div className={darkTheme ? "alert__text" : "alert__text dark"}>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .pauseFor(500)
                .changeDelay(10)
                .typeString(
                  "Seems like you aren't logged in... 🤔 <br />you can't chat with people without account."
                )
                .callFunction((state) => {
                  state.elements.cursor.style.display = "none";
                })
                .start();
            }}
          />
        </div>
        <div className="btns-wrapper">
          <button onClick={() => {
            dispatch({type: "NO_USER_ALERT", payload: false})
            dispatch({type: "SIGN_UP", payload: true})
          }}>Sign up</button>
          <button onClick={() => {
            dispatch({type: "NO_USER_ALERT", payload: false})
          }}>Log in</button>
        </div>
      </motion.div>
    </div>
  );
};

export default AlertBox;
