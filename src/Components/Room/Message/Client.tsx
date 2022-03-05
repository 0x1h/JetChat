import { FC, FormEvent, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTime } from "../../../utils/getTime";
import { State } from "../../../Hooks/Chat/ClientReducer";
import { useParams } from "react-router-dom";
import { tokenGenerator } from "../../../utils/randomToken";

const Client: FC<{ socket: any }> = ({ socket }) => {
  const chatRoom = useSelector((state: { chatData: State }) => state.chatData);
  const dispatch = useDispatch();
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const { roomId } = useParams();

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
        },
      },
    });

    socket.emit("send-message", chatRoom, roomId);
    dispatch({ type: "CLEAR_MESSAGE_FIELD" });
  };

  useEffect(() => {
    socket.on("receive", (msg) => {
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
          },
        },
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <form className="client__input-form" onSubmit={messageSend}>
      <input
        type="text"
        autoCorrect="off"
        className={darkTheme ? "client__input dark" : "client__input"}
        value={chatRoom.message}
        maxLength={250}
        placeholder="Send message in room"
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
