import { FC, useEffect, useRef } from "react";
import Twemoji from 'react-twemoji';
import "./style/style.css";
import { useDispatch, useSelector } from "react-redux";
import {State} from "../../../../Hooks/Chat/RoomData"
import { onlyEmojis } from "../../../../utils/Emoji";



export interface MessageProps {
  sentBy: string; //client_id
  username: string; //client_username,
  sentAt: string; //Date format,
  message: string;
  profile_src: string;
  message_id: string;
}

const JustMessage: FC<MessageProps> = ({
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

  const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();

      dispatch({type: "SET_OPTIONS_CONFIG", payload: {
        message_author: sentBy,
        message_id: message_id,
        room_owner: roomData.owner_data.client_id,
        message_username: username,
        message_text: message,
        message_profile: profile_src,
        
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
            <img src={profile_src.trim() === "" ? "/Avatars/Avatar-1.png":profile_src} alt="" draggable={false}/>
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
            <Twemoji options={{ className: onlyEmojis(message) ? "twemoji big" : "twemoji"}}>
              {message}
              </Twemoji>
          </div>
        </div>
      </div>
  );
};

export default JustMessage;
