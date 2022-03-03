import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State as MessageState } from "../../../Hooks/Chat/ChatMessages";
import RoomHeader from "./RoomHeader";
import { tokenGenerator } from "../../../utils/randomToken";
import JustMessage from "./Message Types/JustMessage";

const SentMessages = () => {
  const chatMessages = useSelector(
    (state: { sentMessages: MessageState[] }) => state.sentMessages
  );
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  ); 

  return (
    <div className="sent_messages__container">
      <RoomHeader darkTheme={darkTheme} />
      {chatMessages.map((message) => {
        return (
          <JustMessage
            username={message.message.username}
            sentBy={message.message.sentBy}
            sentAt={""}
            message={message.message.messageText}
						profile_src={message.message.client_profile} 
						key={tokenGenerator()} 
					/>
        );
      })}
    </div>
  );
};

export default SentMessages;
