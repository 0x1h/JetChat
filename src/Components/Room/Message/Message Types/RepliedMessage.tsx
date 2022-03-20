import { useRef, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../../Hooks/Chat/RoomData";
import { onlyEmojis } from "../../../../utils/Emoji";
import Twemoji from 'react-twemoji';
import { MessageProps } from "./JustMessage";

interface ReplyMessage extends MessageProps {
  reply_username: string;
  reply_picture: string;
  reply_message: string;
  reply_client_id: string;
}

const RepliedMessage: FC<ReplyMessage> = ({
  sentAt,
  sentBy,
  username,
  profile_src,
  message,
  message_id,
  reply_username,
  reply_picture,
  reply_message,
  reply_client_id,
}) => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const roomData = useSelector((state: { roomData: State }) => state.roomData);
  const messageRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [amIMentioned, setAmIMentioned] = useState(false);

  const handleContextMenu = (event: any) => {
    event.preventDefault();

    dispatch({
      type: "SET_OPTIONS_CONFIG",
      payload: {
        message_author: sentBy,
        message_id: message_id,
        room_owner: roomData.owner_data.client_id,
        message_username: username,
        message_text: message,
        message_profile: profile_src,
      },
    });

    dispatch({
      type: "OPEN_OPTIONS",
      payload: {
        x: event.clientX,
        y: event.clientY,
      },
    });
  };

  useEffect(() => {
    const client_id = JSON.parse(localStorage.getItem("client_id")!);

    if (reply_client_id === client_id) setAmIMentioned(true);
    else setAmIMentioned(false);
  }, [roomData]);

  useEffect(() => {
    messageRef.current?.addEventListener("contextmenu", handleContextMenu);

    return () => {
      messageRef.current?.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return (
    <div
      className={
        darkTheme ? `replied-message-wrapper dark ${amIMentioned ? "ping" : ""}` : `replied-message-wrapper ${amIMentioned ? "ping" : ""}`
      }
      ref={messageRef}
    >
      <div className="replied-message__content">
        <div className="curved-line"></div>
        <div className="replied-to">
          <div className="replied-pfp-wrapper">
            <img src={reply_picture} alt="" />
          </div>
          <div
            className={
              darkTheme ? "replied__username dark" : "replied__username"
            }
          >
            {reply_username}
          </div>
          <div
            className={
              darkTheme ? "replied__messageText dark" : "replied__messageText"
            }
          >
            <Twemoji options={{ className: "twemoji mini"}}>
              {reply_message}
            </Twemoji>
          </div>
        </div>
      </div>
      <div className={darkTheme ? "replied-message dark" : "replied-message"}>
        <div className="reply__content"></div>
        <div className="profile-picture">
          <div className="profile-picture__wrapper">
            <img src={profile_src} alt="" />
          </div>
        </div>
        <div className="main-content">
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
    </div>
  );
};

export default RepliedMessage;
