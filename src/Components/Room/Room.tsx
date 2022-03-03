import { useEffect } from "react";
import hostConfig from "../../utils/hostconfig.json";
import UsersDashboard from "./RoomUsers/UsersDashboard";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { State } from "../../Hooks/Chat/ClientReducer";
import { State as AlertType } from "../../Hooks/Client/loadErrorHandle";
import Messages from "./Message/Messages";
import Loader from "../Loader";
import Confirm from "../Confirm";
import "./style/style.css";

const Room = () => {
  const socket = io(hostConfig.host);
  // const chatData = useSelector((state: { chatData: State }) => state.chatData);
  const loadErrHandle = useSelector(
    (state: { loadErrHandler: AlertType }) => state.loadErrHandler
  );
  const dispatch = useDispatch();

  const loadClientData = (client_id: string, authToken: string) => {
    dispatch({ type: "LOAD" });

    axios
      .post(`${hostConfig.host}/user/${client_id}`, {
        authToken: authToken,
        requestor: client_id,
      })
      .then((data) => {
        const { username, client_id, profile_src, createdAt } = data.data;
        dispatch({ type: "DEFAULT" });

        dispatch({
          type: "SET_USER",
          payload: {
            username: username,
            profile_src: profile_src,
            createdAt: createdAt,
            client_id: client_id,
          },
        });
      })
      .catch((err) => {
				dispatch({
					type: "ERROR",
					payload:
						"Seems like you aren't Loogged in your account, you can't join in room without account, sorry :(",
				});
        if (
          err === "User not found" ||
          err === "Invalid Authentiction" ||
          err === "Invalid arguments"
        ) {
          localStorage.removeItem("client_id");
          sessionStorage.removeItem("s_t");

        }
      });
  };

  // const submitHandler = (e: FormEvent) => {
  // 	e.preventDefault()

  // 	if(!input.trim()) return

  // 	setMsg((prev: any) => [...prev, input.trim()])
  // 	setInput('')
  //   socket.emit("send-message", input.trim())
  // }

  // useEffect(() => {
  // 	if(socket.connected) return

  //   socket.on("receive", msg => {
  //     setMsg((prev: any) => [...prev, msg])
  //   })

  //   return () => {
  //     socket.disconnect();
  //   }
  // }, [socket])

  useEffect(() => {
    if (socket.connected) return;
    const { status } = loadErrHandle;

    const client_id = localStorage.getItem("client_id");
    const secret_token = sessionStorage.getItem("s_t");

    //stopping firing client data load if client isn't registered
    if (client_id === null || secret_token === null) {
      dispatch({
        type: "ERROR",
        payload:
          "Seems like you aren't Logged in your account, you can't join in room without account, sorry :(",
      });
      return;
    }

    //loading client data if tokens exist
    loadClientData(JSON.parse(client_id), JSON.parse(secret_token));

    //don't connect socket if Request is loading or has error
    if (status === "isError" || status === "isLoading") return;

    socket.on("connect", () => {
      console.log("User connect socket");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {loadErrHandle.status === "isLoading" ? (
        <div className="modals-container__warn_load">
          <Loader />
        </div>
      ) : loadErrHandle.status === "isError" ? (
        <div className="alert-container">
					<Confirm msg={loadErrHandle.msg} img={true}/>
				</div>
      ) : null}
      <div className="chatting-playground">
        <Messages />
        <UsersDashboard />
      </div>
    </>
  );
};

export default Room;
