import { FC, useEffect, useState } from "react";
import { State as RoomData } from "../../../../Hooks/Chat/RoomData";
import { useSelector } from "react-redux";
import { isEqual } from "../../../../utils/isEqual";
import { Input } from "../../../Home/Sign up/SignUp";

export type isEqualType = {
  room_name: string;
  room_icon: string;
};

interface RoomInfoProps {
  unChanged: (state: boolean) => void;
  unChange: isEqualType;
	inputHandler: (e: Input) => void
}

const RoomInfo: FC<RoomInfoProps> = ({ unChanged, unChange, inputHandler }) => {
  const roomData = useSelector(
    (state: { roomData: RoomData }) => state.roomData
  );
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

  useEffect(() => {
    if (!unChange.room_name.trim()) return;

    const compareObj: isEqualType = {
      room_name: roomData.room_name,
      room_icon: roomData.room_icon,
    };

    const isequal = isEqual<isEqualType>(compareObj, unChange);
    unChanged(!isequal);
  }, [unChange]);

  const client_id = JSON.parse(localStorage.getItem("client_id")!)

  return (
    <div className="room-dashboard-logo">
      <div className="room-icon-wrapper">
        <img src={roomData.room_icon} alt="" />
      </div>
      <div className="room-info__inputs">
        <label
          htmlFor="Room name"
          className={darkTheme ? "label dark" : "label"}
          autoCorrect="off"
          spellCheck="false"
        >
          Room Name
        </label>
        <input
          type="text"
          className={darkTheme ? `room_inputs dark ${client_id === roomData.owner_data.client_id ? "": "forbidden"}` : `room_inputs  ${client_id === roomData.owner_data.client_id ? "": "forbidden"}`}
          value={unChange.room_name}
          name="room_name"
          onChange={inputHandler}
          autoComplete="off"
        />
        <label
          htmlFor="Room icon"
          className={darkTheme ? "label dark" : "label"}
        >
          Room Icon
        </label>
        <input
          type="text"
          className={darkTheme ? `room_inputs dark ${client_id === roomData.owner_data.client_id ? "": "forbidden"}` : `room_inputs ${client_id === roomData.owner_data.client_id ? "": "forbidden"}`}
          value={unChange.room_icon}
          spellCheck="false"
          autoComplete="off"
          name="room_icon"
          onChange={inputHandler}
        />
      </div>
    </div>
  );
};

export default RoomInfo;
