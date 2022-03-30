import { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTime } from "../../../utils/getTime";
import { Picker } from 'emoji-mart'
import { State } from "../../../Hooks/Chat/ClientReducer";
import { useParams } from "react-router-dom";
import { tokenGenerator } from "../../../utils/randomToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { socket } from "../Room";
import 'emoji-mart/css/emoji-mart.css'

const Client = () => {
  const chatRoom = useSelector((state: { chatData: State }) => state.chatData);
  const dispatch = useDispatch();
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const { roomId } = useParams();
  const clientRef = useRef<HTMLInputElement>(null);
  const emojiMenu = useRef<HTMLDivElement>(null);
  const [openEmoji, setOpenEmoji] = useState(false)
  
  const handleClickOutside = (event: any): void => {
    if (emojiMenu.current && !emojiMenu.current!.contains(event.target)) {
      setOpenEmoji(false);
    }
  };

  //fire "handleClickOutside()"
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const messageSend = (e: FormEvent) => {
    e.preventDefault();

    if (!chatRoom.message.trim()) return;

    dispatch({
      type: "MESSAGE",
      payload: {
        message: {
          sentAt: getTime(new Date()),
          username: chatRoom.username,
          sentBy: chatRoom.client_id,
          messageText: chatRoom.message,
          client_profile: chatRoom.profile_src,
          message_id: chatRoom.message_id,
          reply: {
            mentioned: chatRoom.reply?.reply_username, //replying username
            mentioned_user_profile: chatRoom.reply?.reply_picture, //replying user profile source
            mentioned_message: chatRoom.reply?.reply_message,
            mentioned_user_id: chatRoom.reply?.reply_message_owner_id,
          },
        },
      },
    });

    socket.emit("send-message", chatRoom, roomId);
    dispatch({ type: "CLEAR_MESSAGE_FIELD" });
    dispatch({ type: "CLEAR_REPLY" });
  };


  useEffect(() => {
    socket.on("receive", (msg: any) => {
      dispatch({
        type: "MESSAGE",
        payload: {
          message: {
            sentAt: getTime(new Date()),
            username: msg.username,
            sentBy: msg.client_id,
            messageText: msg.message,
            client_profile: msg.profile_src,
            message_id: msg.message_id,
            reply: {
              mentioned: msg.reply?.reply_username, //replying username
              mentioned_user_profile: msg.reply?.reply_picture, //replying user profile source
              mentioned_message: msg.reply?.reply_message,
              mentioned_user_id: msg.reply?.reply_message_owner_id,
            },
          },
        },
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatRoom.reply?.reply_username !== undefined) {
      clientRef.current?.focus();
    }
  }, [chatRoom]);

  return (
    <form className="client__input-form" onSubmit={messageSend}>
      <div className="emojis-menu-opener" onClick={() => setOpenEmoji(true)}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/800px-Twemoji_1f600.svg.png" alt="" />
        {
          openEmoji && 
          <div className="emoji-menu" ref={emojiMenu}>
            <Picker set="twitter" showPreview={false} showSkinTones={false} theme={darkTheme ? "dark" : "light"} onSelect={(emoji: any) => {
              console.log(emoji);
              
              dispatch({
                type: "MESSAGE_INPUT",
                payload: {
                  message: `${chatRoom.message}${emoji.native}`,
                },
              });
            }}/>
          </div>
        }
        </div>
      {chatRoom.reply !== undefined && (
        <div className="replying_to">
          Replying to <p>{chatRoom.reply.reply_username}</p>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="exit-reply"
            onClick={() => dispatch({ type: "CLEAR_REPLY" })}
          />
        </div>
      )}
      <input
        type="text"
        autoCorrect="off"
        className={darkTheme ? "client__input dark" : "client__input"}
        value={chatRoom.message}
        maxLength={250}
        placeholder="Send message in room"
        ref={clientRef}
        onChange={(e) => {
          dispatch({
            type: "MESSAGE_INPUT",
            payload: {
              message: e.target.value,
            },
          });
          dispatch({
            type: "SET_MESSAGE_ID",
            payload: {
              message_id: tokenGenerator(),
            },
          });
        }}
      />
    </form>
  );
};

export default Client;
