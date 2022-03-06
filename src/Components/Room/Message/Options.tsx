import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State as OptionState } from "../../../Hooks/Chat/optionsModal";
import { State as OptionConfig } from "../../../Hooks/Chat/optionsHandle";

const Options = () => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const optionConfig = useSelector(
    (state: { optionsHandle: OptionConfig }) => state.optionsHandle
  );
  const optionModal = useSelector(
    (state: { optionModal: OptionState }) => state.optionModal
  );
  const optionsRef = useRef<HTMLDivElement>(null);
	const [showBtns, setShowBtns] = useState<boolean>(false)

  const dispatch = useDispatch();

  const handleClickOutside = (event: any) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      dispatch({ type: "CLOSE_OPTIONS" });
    }
  };

	const client_id = JSON.parse(localStorage.getItem("client_id")!) as string;

  useEffect(() => {
		if(optionConfig.message_author === client_id || optionConfig.room_owner === client_id){
			setShowBtns(true)
		}
	}, [optionConfig])

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("contextmenu", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.addEventListener("contextmenu", handleClickOutside, true);
    };
  }, []);  

  const setReplyMessage = () => {
    dispatch({
      type: "SET_REPLY_MESSAGE",
      payload: {
        reply_username: optionConfig.message_username,
		    reply_picture: optionConfig.message_profile,
		    reply_message: optionConfig.message_text,
        reply_message_id: optionConfig.message_author
      }
    })
    dispatch({type: "CLOSE_OPTIONS"})
  }


  return (
    <div
      className={darkTheme ? "message_option dark" : "message_option"}
      ref={optionsRef}
      style={{
        transform: `translate(${optionModal.x}px, ${optionModal.y}px)`,
      }}
    >
      <button
        className={darkTheme ? "options-config-btn dark" : "options-config-btn"}
        onClick={setReplyMessage}
      >
        Reply
      </button>
      <button
			onClick={() => {
				navigator.clipboard.writeText(optionConfig.message_id)
				dispatch({type: "CLOSE_OPTIONS"})
			}}
        className={darkTheme ? "options-config-btn dark" : "options-config-btn"}
      >
        Copy Message ID
      </button>
      {
				showBtns && <button
				className={
					darkTheme
						? "options-config-btn delete-btn dark"
						: "options-config-btn delete-btn"
				}
			>
				Delete
			</button>
			}
    </div>
  );
};

export default Options;
