import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../Hooks/Client/loginReducer";
import { FC } from "react";

const LoginInputs: FC<{allowRequest: boolean, showPassword: boolean}> = ({allowRequest, showPassword}) => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const loginReducer = useSelector(
    (state: { loginReducer: State }) => state.loginReducer
  );
  const dispatch = useDispatch();

  return (
    <>
      <input
        type="text"
        className={!darkTheme ? "login_input" : "login_input dark"}
        value={loginReducer.username}
        placeholder="Username"
        onChange={(e) => {
          dispatch({
            type: "LOGIN_FILL",
            payload: {
              key: "username",
              value: e.target.value.trim(),
            },
          });
          dispatch({
            type: "DEFAULT",
          });
        }}
      />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={loginReducer.password}
        className={!darkTheme ? "login_input" : "login_input dark"}
        onChange={(e) => {
          dispatch({
            type: "LOGIN_FILL",
            payload: {
              key: "password",
              value: e.target.value,
            },
          });
          dispatch({
            type: "DEFAULT",
          });
        }}
      />
      <div className="btn-wrapper">
        <button
          className={darkTheme ? "dark" : ""}
          onClick={() => dispatch({ type: "LOG_IN", payload: false })}
          type="button"
        >
          Cancel
        </button>
        <button
          className={!allowRequest ? "sign-up-btn unverfied" : "sign-up-btn"}
          disabled={!allowRequest}
          type="submit"
        >
          Log in
        </button>
      </div>
    </>
  );
};

export default LoginInputs;
