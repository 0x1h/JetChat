import { FC, useCallback, useState, useEffect, useRef } from "react";
import "./style/style.css";
import { useDispatch, useSelector } from "react-redux";
import {State} from "../../../../Hooks/Chat/RoomData"

interface JustMessageProps {
  sentBy: string; //client_id
  username: string; //client_username,
  sentAt: string; //Date format,
  message: string;
  profile_src: string;
  message_id: string;
}

const JustMessage: FC<JustMessageProps> = ({
  sentAt,
  sentBy,
  username,
  profile_src,
  message,
  message_id,
}) => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const roomData = useSelector(
    (state: { roomData: State }) => state.roomData
  );
  const messageRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch()

  const handleContextMenu = (event: any) => {
      event.preventDefault();

      dispatch({type: "SET_OPTIONS_CONFIG", payload: {
        message_author: sentBy,
        message_id: message_id,
        room_owner: roomData.owner_data.client_id
      }})
      
      dispatch({type: "OPEN_OPTIONS", payload: {
        x: event.clientX,
        y: event.clientY
      }})

    }
    

  useEffect(() => {
    messageRef.current?.addEventListener("contextmenu", handleContextMenu);

    return () => {
      messageRef.current?.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return (
      <div className={darkTheme ? "just-message dark" : "just-message"}>
        <div className="profile-picture">
          <div className="profile-picture__wrapper">
            <img src={profile_src} alt="" />
          </div>
        </div>
        <div className="main-content" ref={messageRef}>
          <div
            className={
              darkTheme ? "time_username-wrapper dark" : "time_username-wrapper"
            }
          >
            {username}
            <time dateTime={new Date().toString()}>{sentAt}</time>
          </div>
          <div
            className={darkTheme ? "actual__messsage dark" : "actual__messsage"}
          >
            {message}
          </div>
        </div>
      </div>
  );
};

export default JustMessage;
