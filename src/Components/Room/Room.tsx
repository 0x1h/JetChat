import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { State as AlertType } from "../../Hooks/Client/loadErrorHandle";
import { useParams } from "react-router-dom";
import { State as OptionState} from "../../Hooks/Chat/optionsModal";
import { io } from "socket.io-client";
import hostConfig from "../../utils/hostconfig.json";
import UsersDashboard from "./RoomUsers/UsersDashboard";
import Options from "./Message/Options";
import axios from "axios";
import RoomDashboard from "./Room Settings/RoomDashboard";
import Messages from "./Message/Messages";
import Loader from "../Loader";
import Confirm from "../Confirm";
import "./style/style.css";

const { host } = hostConfig;
export const socket = io(host);

const Room = () => {
  const loadErrHandle = useSelector(
    (state: { loadErrHandler: AlertType }) => state.loadErrHandler
    );
    const optionModal = useSelector((state: {optionModal: OptionState}) => state.optionModal)
    const { roomId } = useParams();
    const settingsModal = useSelector((state: {settingsModal: boolean}) => state.settingsModal)
    const dispatch = useDispatch();
    
    useEffect(() => {
      socket.on("join", (msg) => {
        dispatch({
          type: "ROOM_MEMBER_UPDATE",
          payload: {
            client_id: msg.client_id,
            client_name: msg.username,   
            client_profile: msg.profile_src,
          },
        });
      });
    }, [])

    const loadClientData = async (client_id: string, authToken: string) => {
      dispatch({ type: "LOAD" });

      axios
      .all([
        axios.post(`${hostConfig.host}/user/${client_id}`, {
          authToken: authToken,
          requestor: client_id,
        }),
        axios.post(`${hostConfig.host}/room/join/${roomId}`, {
          authToken: authToken,
          requestor: client_id,
        }),
      ])
      .then(
        axios.spread(async (userInfo, roomData) => {
          const { username, client_id, profile_src, createdAt } =
          await userInfo.data;

          axios.put(`${host}/room/update_user/add/${roomId}`, {
            authToken: authToken,
            requestor: client_id,
            username: username,
            profile_src: profile_src
          }).then((msg) => {
            // console.log(msg)
          }).catch(err => {
            console.log(err);
            
          })

          socket.emit("join", roomId, {
            username: username,
            profile_src: profile_src,
            client_id: client_id,
          });

          dispatch({
            type: "SET_USER",
            payload: {
              username: username,
              profile_src: profile_src,
              createdAt: createdAt,
              client_id: client_id,
            },
          });

          
          const { room_icon, banned_users, room_name, room_id,owner_id, online_users} = await roomData.data;
          

          const ownerData = await axios.post(
            `${hostConfig.host}/user/${owner_id}`,
            {
              authToken: authToken,
              requestor: client_id,
            }
            );
            
            dispatch({
              type: "LOAD_ROOM_DATA",
              payload: {
                room_id: room_id,
                room_name: room_name,
                room_icon: room_icon,
                owner_data: {
                  client_id: ownerData.data.client_id,
                  client_name: ownerData.data.username,
                  client_profile: ownerData.data.profile_src,
              },
              active_clients: [
                ...online_users.map((e: any) => {
                return {
                  client_id: e.client_id,
                  client_name: e.username,
                  client_profile: e.profile_src
                }
              }),
                {
                  client_name: username,
                   client_profile: profile_src,
                  client_id: client_id,
                },
            ],
              banned_users: banned_users,
            },
          });

          dispatch({ type: "DEFAULT" });
        })
        )
        .catch((error) => {    
          const { err } = error.response.data;
          
          if (
            err === "User not found" ||
            err === "Invalid Authentiction" ||
          err === "Invalid arguments"
        ) {
          dispatch({ type: "ERROR", payload:"Seems like you aren't Logged in your account, you can't join in room without account, sorry :(" })
          localStorage.removeItem("client_id");
          return sessionStorage.removeItem("s_t");
        }else if(err === "room not found"){
          dispatch({ type: "ERROR", payload: "Room not found, make sure your URL or inputed room code is correct"
          })
        }
      });
  };

  useEffect(() => {
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
  }, []);

  return (
    <>
    {
      optionModal.open && 
      <Options />
    }
      {settingsModal && <RoomDashboard />}
      {loadErrHandle.status === "isLoading" ? (
        <div className="modals-container__warn_load">
          <Loader />
        </div>
      ) : loadErrHandle.status === "isError" ? (
        <div className="alert-container">
          <Confirm msg={loadErrHandle.msg} img={true} />
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
