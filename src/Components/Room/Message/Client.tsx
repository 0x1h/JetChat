import { FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../Hooks/Chat/ClientReducer";


const Client = () => {
  const chatRoom = useSelector((state: { chatData: State }) => state.chatData);
  const dispatch = useDispatch()
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );


  const messageSend = (e: FormEvent) => {
    e.preventDefault();

    if(!chatRoom.message.trim()) return

    dispatch({type: "MESSAGE", payload: {
      message: {
        sentAt: "",
        username: chatRoom.username,
        sentBy: chatRoom.client_id,
        messageText: chatRoom.message,
        client_profile: chatRoom.profile_src
      }
    }})

    dispatch({type: "CLEAR_MESSAGE_FIELD"})
  };

  return (
    <form className="client__input-form" onSubmit={messageSend}>
      <input
        type="text"
        autoCorrect="off"
        className={darkTheme ? "client__input dark" : "client__input"}  
        value={chatRoom.message}
        placeholder="Send message in room"
        onChange={(e) => {
          dispatch({type: "MESSAGE_INPUT", payload: { 
            message: e.target.value
          }})
        }}
      />
    </form>
  );
};

export default Client;
