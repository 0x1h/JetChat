import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../Hooks/loginReducer";
import { useEffect, useState, useRef, FormEvent, useCallback } from "react";
import axios from "axios";
import Loader from "../../Loader";
import Checkbox from "./Checkbox";
import LoginInputs from "./LoginInputs";
import Confirm from "../../Confirm";
import "./style/style.css";

const Login = () => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const loginReducer = useSelector(
    (state: { loginReducer: State }) => state.loginReducer
  );
	const loadErrHandler = useSelector(
		(state: {loadErrHandler: {
			status: "isLoading" | "isError" | "default"
		msg: string
		}}) => state.loadErrHandler
	)
  
  const dispatch = useDispatch();
  const [appear, setAppear] = useState<boolean>(false);
  const [allowRequest, setAllowRequest] = useState<boolean>(false);
  const loginRef = useRef<HTMLDivElement>(null);
	const [accept, setAccept] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const variants = {
    visible: { opacity: appear ? 1 : 0, y: appear ? 0 : 50 },
    hidden: { opacity: 0, y: appear ? 0 : -200 },
  };
  

  //fire animation when modal boolean is true
  useEffect(() => {
    let timeout = setTimeout(() => {
      setAppear(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const closeAccept = useCallback(() => {
      let timeout = setTimeout(() => {
        setAccept(false)
        dispatch({ type: "LOG_IN", payload: false })
      }, 2000)
    
      return () => clearTimeout(timeout)

  }, [accept])

  const handleClickOutside = (event: any): void => {
    if (loginRef.current && !loginRef.current!.contains(event.target)) {
      dispatch({ type: "LOG_IN", payload: false });
    }
  };
  

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  useEffect(() => {
    const objValues: string[] = Object.values(loginReducer);

    for (let i = 0; i < objValues.length; i++) {
      if (!objValues[i].trim()) return setAllowRequest(false);
    }
    setAllowRequest(true);
  }, [loginReducer]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
		dispatch({type: "LOAD"})
		
		axios.post("http://localhost:3001/login", {
			username: loginReducer.username,
			password: loginReducer.password
		})
		.then(data => {
      const {profile_src, createdAt, username, client_id, authToken} = data.data
      
      localStorage.setItem("client_id", JSON.stringify(client_id))
      sessionStorage.setItem("s_t", JSON.stringify(authToken))
      
      setAccept(true)
      closeAccept()
      dispatch({type: "DEFAULT"})

      dispatch({type: "FILL_USER", payload: {
        username: username,
	      client_id: client_id,
	      createdAt: createdAt,
	      profile_src: profile_src,
        isLogined: true
      }})
      
      dispatch({
        type: "LOGIN_FILL",
        payload: {
          key: "password",
          value: '',
        },
      });
      dispatch({
        type: "LOGIN_FILL",
        payload: {
          key: "username",
          value: '',
        },
      });
		})
		.catch((error: any) => {
			const {err} = error.response.data
			dispatch({type: "DEFAULT"})

			if(err === "Password is incorrect"){
				dispatch({
					type: "ERROR",
					payload: err
				})
			}

			if(err === "User not found"){
				dispatch({
					type: "ERROR",
					payload: `${loginReducer.username} doesn't exist`
				})
			}
		})
  }
	
  return (
    <div className="alert-container log_in">
      <div className="login__wrapper" ref={loginRef}>
        {
					loadErrHandler.status === "isLoading"
					? <Loader /> :
					accept ? 
					<Confirm msg="Successfully Logged in"/>
					:
					<motion.form
          className={darkTheme ? "login-wrapper dark" : "login-wrapper"}
          variants={variants}
          animate="visible"
          transition={{ ease: "easeOut" }}
          initial="hidden"
          onSubmit={submitHandler}
        >
          <h2 className={!darkTheme ? "login_text" : "login_text dark"}>
            Log in
          </h2>
					{
						loadErrHandler.status === "isError" 
						&& <div className="warn">
									{loadErrHandler.msg}
							</div>
					}
            <LoginInputs allowRequest={allowRequest} showPassword={showPassword}/>
            <Checkbox stateChange={() => setShowPassword((prev) => !prev)}/>
        </motion.form>
				}
      </div>
    </div>
  );
};

export default Login;
