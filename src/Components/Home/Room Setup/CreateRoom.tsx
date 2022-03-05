import { useRef, useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import JoinRoom from "./JoinRoom";
import PrivateCreate from "./PrivateCreate";
import { motion } from "framer-motion";
import "./style/style.css";

type RoomModal = "default" | "create" | "join";

const CreateRoom: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [roomOption, setRoomOption] = useState<RoomModal>("default");
  const [appear, setAppear] = useState<boolean>(false);
  const roomRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

  const handleClickOutside = (event: any): void => {
    if (roomRef.current && !roomRef.current!.contains(event.target)) {
      dispatch({ type: "PRIVATE_ROOM", payload: false });
      closeModal();
    }
  };

  //fire "handleClickOutside()"
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

	useEffect(() => {
		let timeout = setTimeout(() => {
      setAppear(true);
    }, 500);

    return () => clearTimeout(timeout);
	})

	const variants = {
    visible: { opacity: appear ? 1 : 0, y: appear ? 0 : 50 },
    hidden: { opacity: 0, y: appear ? 0 : -200 },
  };

  return (
    <div className="alert-container room_container">
      <motion.div
        className={darkTheme ? "room__modal dark" : "room__modal"}
        ref={roomRef}
				variants={variants}
        animate="visible"
        transition={{ ease: "easeOut", duration: 0.4 }}
        initial="hidden"
      >
        {roomOption === "default" ? (
          <>
            <button
              className="room-option__btn"
              onClick={() => setRoomOption("create")}
            >
              Create Room
            </button>
            <button
              className="room-option__btn"
              onClick={() => setRoomOption("join")}
            >
              Join Chat
            </button>
          </>
        ) : roomOption === "create" ? (
          <PrivateCreate goBack={() => setRoomOption("default")}/>
        ) : (
          <JoinRoom goBack={() => setRoomOption("default")}/>
        )}
      </motion.div>
    </div>
  );
};

export default CreateRoom;
