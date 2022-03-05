import { FC } from "react";
import { State } from "../../../Hooks/Client/signReducer";
import { Input } from "./SignUp";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import captchaConfig from "../captcha.json";
import {useDispatch} from "react-redux"

interface InputProps {
  form: State;
  darkTheme: boolean;
  inputHandler: (e: Input) => void;
}

const Inputs: FC<InputProps> = ({ form, darkTheme, inputHandler }) => {
  const dispatch = useDispatch()

  return (
    <>
      <input
        type="text"
        value={form.profile_src}
        className={darkTheme ? "sign__input dark" : "sign__input"}
        name="profile_src"
        onChange={inputHandler}
        autoComplete="off"
        placeholder="Image URL"
      />
      <input
        type="text"
        value={form.username}
        className={darkTheme ? "sign__input dark" : "sign__input"}
        name="username"
        onChange={inputHandler}
        autoComplete="off"
        placeholder="Username*"
      />
      <input
        type="password"
        value={form.password}
        className={darkTheme ? "sign__input dark" : "sign__input"}
        name="password"
        onChange={inputHandler}
        autoComplete="off"
        placeholder="Password*"
      />
      <input
        type="password"
        value={form.repeat_password}
        className={darkTheme ? "sign__input dark" : "sign__input"}
        name="repeat_password"
        onChange={inputHandler}
        autoComplete="off"
        placeholder="Repeat Password*"
      />
      <HCaptcha sitekey={captchaConfig.site_key} onVerify={(verify_id) => {
        dispatch({type: "INPUT_FIELD", payload: {
          key: "isVerified",
          value: verify_id
        }})
        
      }} theme={darkTheme ? "dark" : "light"}
        onExpire={() => {
          dispatch({type: "INPUT_FIELD", payload: {
            key: "isVerified",
            value: ""
          }})
        }}
      />
    </>
  );
};

export default Inputs;
