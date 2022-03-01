import { FC } from "react";
import { Input } from "../Sign up/SignUp";
import { State } from "../../../Hooks/createRoomReducer";

interface PrivateInputProps {
  inputHandler: (e: Input) => void;
  darkTheme: boolean;
  roomForm: State;
}

const PrivateInputs: FC<PrivateInputProps> = ({
  inputHandler,
  darkTheme,
  roomForm,
}) => {
  return (
    <>
      <input
        type="text"
        autoComplete={"off"}
        className={darkTheme ? "room_inputs dark" : "room_inputs"}
        value={roomForm.room_icon}
        onChange={inputHandler}
        name="room_icon"
        placeholder="Room Icon"
      />
      <input
        type="text"
        autoComplete={"off"}
        className={darkTheme ? "room_inputs dark" : "room_inputs"}
        name="room_name"
        value={roomForm.room_name}
        onChange={inputHandler}
        placeholder="Room Name*"
      />
      <button
        type="button"
        className={roomForm.room_name.trim().length > 0 ? "room__create-btn accept" : "room__create-btn"}
        disabled={!roomForm.room_name.trim()}
        
      >
        Create
      </button>
      <hr className="line" />
      <div className="room-code-wrapper">
        <input
          type="text"
          autoComplete={"off"}
          className={darkTheme ? "room_inputs dark" : "room_inputs"}
          placeholder="Room code will appear here"
          value={roomForm.room_code}
        />
        <input
          type="text"
          autoComplete={"off"}
          className={darkTheme ? "room_inputs dark" : "room_inputs"}
          placeholder="Full URL will appear here"
          value={
            roomForm.room_code === ""
              ? ""
              : `${window.location.hostname}/${roomForm.room_code}`
          }
        />
      </div>
    </>
  );
};

export default PrivateInputs;
