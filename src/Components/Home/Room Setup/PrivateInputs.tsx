import { FC } from "react";
import { Input } from "../Sign up/SignUp";
import { useNavigate } from "react-router-dom";
import { State } from "../../../Hooks/Client/createRoomReducer";

interface PrivateInputProps {
  inputHandler: (e: Input) => void;
  darkTheme: boolean;
  roomForm: State;
  createRoom: () => void
  disconnect: () => void
}

const PrivateInputs: FC<PrivateInputProps> = ({
  inputHandler,
  darkTheme,
  roomForm,
  createRoom,
  disconnect
}) => {
  const navigate = useNavigate()

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
        onClick={createRoom}
      >
        Create
      </button>
      <hr className="line" />
      <div className="room-code-wrapper">
        <input
          readOnly
          type="text"
          autoComplete={"off"}
          className={darkTheme ? "room_inputs dark" : "room_inputs"}
          placeholder="Room code will appear here"
          value={roomForm.room_code}
        />
        <input
          type="text"
          autoComplete={"off"}
          readOnly
          className={darkTheme ? "room_inputs dark" : "room_inputs"}
          placeholder="Full URL will appear here"
          value={
            roomForm.room_code === ""
              ? ""
              : `${window.location.hostname}/room/${roomForm.room_code}`
          }
        />
      </div>
      {
        roomForm.room_code.trim() &&
        <div className="join-room-btns">
        <button type="button" className={darkTheme? "result-btns dark" : "result-btns"} onClick={disconnect}> 
          Cancel Room
        </button>
        <button type="button" className="result-btns" onClick={() => navigate(`/room/${roomForm.room_code}`)}>
          Join Room
        </button>
      </div>
      }
    </>
  );
};

export default PrivateInputs;
