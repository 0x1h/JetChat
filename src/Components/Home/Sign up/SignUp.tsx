import { useEffect, useRef, useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { State } from "../../../Hooks/signReducer";
import { useSelector, useDispatch } from "react-redux";
import ProfilePicture from "./ProfilePicture";
import Inputs from "./Inputs";
import "./style/style.css";

export type Input = ChangeEvent<HTMLInputElement>;

const SignUp = () => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const form = useSelector(
    (state: { signReducer: State }) => state.signReducer
  );
  //modal state
  const [appear, setAppear] = useState<boolean>(false);
  const signRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();

  //animation config
  const variants = {
    visible: { opacity: appear ? 1 : 0, y: appear ? 0 : 50 },
    hidden: { opacity: 0, y: appear ? 0 : -200 },
  };

  const inputHandler = (e: Input) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch({
      type: "INPUT_FIELD",
      payload: {
        key: name.trim(),
        value: value.trim(),
      },
    });
  };

  //fire animation when modal boolean is true
  useEffect(() => {
    let timeout = setTimeout(() => {
      setAppear(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  //detect if user clicks outside of signup <div>
  const handleClickOutside = (event: any): void => {
    if (signRef.current && !signRef.current!.contains(event.target)) {
      dispatch({ type: "SIGN_UP", payload: false });
    }
  };

  //fire "handleClickOutside()"
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <div className="alert-container sign__up">
      <motion.form
        className={darkTheme ? "sign__up-form dark" : "sign__up-form"}
        ref={signRef}
        variants={variants}
        animate="visible"
        transition={{ ease: "easeOut" }}
        initial="hidden"
      >
        <ProfilePicture />
        <Inputs form={form} inputHandler={inputHandler} darkTheme={darkTheme} />
        <div className="btn-wrapper">
          <button
            className={darkTheme ? "dark" : ""}
            onClick={() => dispatch({ type: "SIGN_UP", payload: false })}
          >
            Cancel
          </button>
          <button>Sign up</button>
        </div>
      </motion.form>
    </div>
  );
};

export default SignUp;
