import { FC } from "react";
import { State } from "../../../Hooks/signReducer";
import { Input } from "./SignUp";

interface InputProps {
  form: State;
  darkTheme: boolean;
  inputHandler: (e: Input) => void;
}

const Inputs: FC<InputProps> = ({ form, darkTheme, inputHandler }) => {
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
        placeholder="Username"
      />
      <input
        type="password"
        value={form.password}
        className={darkTheme ? "sign__input dark" : "sign__input"}
        name="password"
        onChange={inputHandler}
        autoComplete="off"
        placeholder="Password"
      />
      <input
        type="password"
        value={form.repeat_password}
        className={darkTheme ? "sign__input dark" : "sign__input"}
        name="repeat_password"
        onChange={inputHandler}
        autoComplete="off"
        placeholder="Repeat Password"
      />
    </>
  );
};

export default Inputs;
