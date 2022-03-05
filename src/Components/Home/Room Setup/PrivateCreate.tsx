import { FC, useEffect, useState } from "react";
import ServerIcon from "./ServerIcon";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../Hooks/Client/createRoomReducer";
import { Input } from "../Sign up/SignUp";
import "./style/private_style.css";
import PrivateInputs from "./PrivateInputs";
import hostConfig from "../../../utils/hostconfig.json"
import { io } from "socket.io-client";
import axios from "axios";

const PrivateCreate: FC<{ goBack: () => void }> = ({ goBack }) => {
  const socket = io(hostConfig.host)
  const roomForm = useSelector(
    (state: { roomState: State }) => state.roomState
  );
  const [roomCode, setRoomCode] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch();
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );


  const inputHandler = (e: Input) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch({
      type: "ROOM_OPTIONS",
      payload: {
        key: name,
        value: value,
      },
    });
  };

  useEffect(() => {
    socket.on("connect", () => {
      setRoomCode(socket.id)
    })
    return () => {socket.disconnect()}
  }, [])

  const diconnect = () => {
    dispatch({type: "CLEAR_ROOM_OPTIONS"})
    socket.disconnect()
  }

  const createRoom = async () => {
    if(!roomForm.room_name.trim() || roomForm.room_code.length > 0) return

    setIsLoading(true)
    const client_id = JSON.parse(localStorage.getItem("client_id")!);
    const secret_token = JSON.parse(sessionStorage.getItem("s_t")!);


    await axios.post(`${hostConfig.host}/room/create`, {
      room_id: roomCode,
      room_name: roomForm.room_name,
      room_icon: roomForm.room_icon,
      requestor: client_id,
      authToken: secret_token
    }).then((resp) => {
      if(resp.data.msg === "Successfully created"){
        setIsLoading(false)

        dispatch({
          type: "ROOM_OPTIONS",
          payload: {
            key: "room_code",
            value: roomCode,
          },
        });

      }
    }).catch((error) => {
      console.log(error);
    })

  }

  return (
    <form className="private_create__modal">
      <div className={darkTheme ? "create__header dark" : "create__header"}>
        <p onClick={goBack}>{"<"} Go Back</p>
        <h4>Create Room</h4>
      </div>
      <ServerIcon />
      <PrivateInputs
        inputHandler={inputHandler}
        roomForm={roomForm}
        darkTheme={darkTheme}
        createRoom={createRoom}
        disconnect={diconnect}
        isLoading={isLoading}
      />
    </form>
  );
};

export default PrivateCreate;
