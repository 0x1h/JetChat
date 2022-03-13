import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTime } from "../../../utils/getTime";
import { State } from "../../../Hooks/Chat/ClientReducer";
import { useParams } from "react-router-dom";
import { tokenGenerator } from "../../../utils/randomToken";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import hostConfig from "../../../utils/hostconfig.json"
import { io } from "socket.io-client";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { State as RoomData} from "../../../Hooks/Chat/RoomData";



const {host} = hostConfig
const socket = io(host);

const Client = () => {
  const chatRoom = useSelector((state: { chatData: State }) => state.chatData);
  const roomData = useSelector((state: { roomData: RoomData }) => state.roomData);
  const dispatch = useDispatch();
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const { roomId } = useParams();    
  const clientRef = useRef<HTMLInputElement>(null)


  
  //! leave that alone
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
            mentioned_user_id: chatRoom.reply?.reply_message_owner_id
          }
        },
      },
    });
    
    socket.emit("send-message", chatRoom, roomId);
    dispatch({ type: "CLEAR_MESSAGE_FIELD" });
    dispatch({type: "CLEAR_REPLY"})
  };

  useEffect(() => {        
    if(chatRoom.username.trim()){
      socket.emit("join", roomId, {
        username: chatRoom.username,
        profile_src: chatRoom.profile_src,
        client_id: chatRoom.client_id
      })  
    }

    socket.on("join-message", (join, msg)  => {
      dispatch({type: "ROOM_MEMBER_UPDATE", payload: {
      client_id: msg.client_id,
      client_name: msg.username, 
      client_profile: msg.profile_src
    }})
  })
    
  return () => {
    socket.disconnect()
  }    
  }, [])


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
              mentioned_user_id: msg.reply?.reply_message_owner_id
            }
          },
        },
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if(chatRoom.reply?.reply_username !== undefined){
      clientRef.current?.focus()
    }
  }, [chatRoom])

  return (
    <form className="client__input-form" onSubmit={messageSend}>
      {
        chatRoom.reply !== undefined &&
        <div className="replying_to">
        Replying to <p>{chatRoom.reply.reply_username}</p>
        <FontAwesomeIcon icon={faCircleXmark} className="exit-reply" onClick={() => dispatch({type: "CLEAR_REPLY"})}/>
      </div>
      }
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
