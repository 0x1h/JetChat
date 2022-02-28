import { useEffect, useRef, useState, ChangeEvent, FormEvent, useCallback, FC } from "react";
import { motion } from "framer-motion";
import { State } from "../../../Hooks/signReducer";
import Loader from "../../Loader";
import { useSelector, useDispatch } from "react-redux";
import ProfilePicture from "./ProfilePicture";
import Inputs from "./Inputs";
import "./style/style.css";
import axios from "axios";
import Confirm from "../../Confirm";

export type Input = ChangeEvent<HTMLInputElement>;

const SignUp: FC<{runTada: (arg: boolean) => void}> = ({ runTada }) => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const form = useSelector(
    (state: { signReducer: State }) => state.signReducer
  );
  const loadErrHandler = useSelector(
		(state: {loadErrHandler: {
			status: "isLoading" | "isError" | "default"
		msg: string
		}}) => state.loadErrHandler
	)

  //modal state
  const [appear, setAppear] = useState<boolean>(false);
  const [allowRequest, setAllowRequest] = useState<boolean>(false);
  const [accept, setAccept] = useState<boolean>(false)
  const signRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();

  //animation config
  const variants = {
    visible: { opacity: appear ? 1 : 0, y: appear ? 0 : 50 },
    hidden: { opacity: 0, y: appear ? 0 : -200 },
  };

  const closeAccept = useCallback(() => {
   setTimeout(() => {
        setAccept(false)
        dispatch({ type: "SIGN_UP", payload: false })
    }, 2000)
    
}, [accept])

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
      dispatch({
        type: "INPUT_FIELD",
        payload: {
          key: "isVerified",
          value: "",
        },
      });
    }
  };

  //fire "handleClickOutside()"
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch({type: "LOAD"})

    if (!allowRequest) return;

    axios
    .post("http://localhost:3001/signup", form)
    .then((data) => {
      const { username, profile_src, client_id, authToken, createdAt } =
      data.data;
      
      localStorage.setItem("client_id", JSON.stringify(client_id));
      sessionStorage.setItem("s_t", JSON.stringify(authToken));
      
      dispatch({type: "DEFAULT"})
      setAccept(true)
      closeAccept()
      runTada(true)
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
      .catch((err) => {
        dispatch({type: "DEFAULT"})

        if (err.response.status === 406) {
          return alert(`User ${form.username} already exists`);
        }

        if (err.response.data.err === "captcha failed") {
          return alert("refresh page and re-complete captcha");
        }
      });
  };

  useEffect(() => {
    const clearPhotoField = {
      a: form.username,
      b: form.repeat_password,
      c: form.password,
      d: form.isVerified,
    };

    const objValues: string[] = Object.values(clearPhotoField);

    for (let i = 0; i < objValues.length; i++) {
      if (!objValues[i].trim()) return setAllowRequest(false);
    }

    if (form.password !== form.repeat_password) return setAllowRequest(false);

    setAllowRequest(true);
  }, [form]);

  return (
    <div className="alert-container sign__up">
      {
        loadErrHandler.status === "isLoading" ?
        <Loader /> : 
        accept ? 
        <Confirm msg={`Welcome on JetChat ${form.username.toLowerCase()}`}/> :
        <motion.form
        className={darkTheme ? "sign__up-form dark" : "sign__up-form"}
        ref={signRef}
        variants={variants}
        animate="visible"
        transition={{ ease: "easeOut" }}
        initial="hidden"
        onSubmit={submitHandler}
      >
        <ProfilePicture />
        <Inputs form={form} inputHandler={inputHandler} darkTheme={darkTheme} />
        <div className="btn-wrapper">
          <button
            className={darkTheme ? "dark" : ""}
            onClick={() => dispatch({ type: "SIGN_UP", payload: false })}
            type="button"
          >
            Cancel
          </button>
          <button
            className={!allowRequest ? "sign-up-btn unverfied" : "sign-up-btn"}
            disabled={!allowRequest}
            type="submit"
          >
            Sign up
          </button>
        </div>
      </motion.form>
      }
    </div>
  );
};

export default SignUp;
