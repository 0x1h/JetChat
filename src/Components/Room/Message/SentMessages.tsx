import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { State as MessageState } from "../../../Hooks/Chat/ChatMessages";
import RoomHeader from "./RoomHeader";
import JustMessage from "./Message Types/JustMessage";

const SentMessages = () => {
  const messagesRef = useRef<HTMLDivElement>(null)
  const chatMessages = useSelector(
    (state: { sentMessages: MessageState[] }) => state.sentMessages
  );
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  ); 

  const scrollToBottom = () => {
    const currTop = messagesRef.current!.scrollTop
    const fullSize = messagesRef.current!.scrollHeight

    if(fullSize - currTop > 1000) return
    
    messagesRef.current!.scrollTop = messagesRef.current!.scrollHeight
  }

  useEffect(scrollToBottom, [chatMessages])

  return (
    <div className="sent_messages__container" ref={messagesRef}>
      <RoomHeader darkTheme={darkTheme} />
      {chatMessages.map((message) => {
        return (
          <JustMessage
            username={message.message.username}
            sentBy={message.message.sentBy}
            sentAt={message.message.sentAt}
            message={message.message.messageText}
						profile_src={message.message.client_profile} 
						key={message.message.message_id} 
            message_id={message.message.message_id}
					/>
        );
      })}
    </div>
  );
};

export default SentMessages;
