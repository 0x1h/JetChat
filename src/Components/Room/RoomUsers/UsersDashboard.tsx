import { useEffect, useRef } from "react";
import ActiveUser from "./ActiveUser";
import { useDispatch, useSelector } from "react-redux";
import { State as RoomData } from "../../../Hooks/Chat/RoomData";
import { socket } from "../Room";
import { useParams } from "react-router-dom";
import "./style/dashboard.css";

const UsersDashboard = () => {
  const { roomId } = useParams();
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const usersRef = useRef<HTMLDivElement>(null)
  const userMenu = useSelector(
    (state: { memberToggler: boolean }) => state.memberToggler
  );
  const dispatch = useDispatch()
  const roomData = useSelector(
    (state: { roomData: RoomData }) => state.roomData
  );

  useEffect(() => {
    socket.on("leave", (client_id) => {
      dispatch({
        type: "ROOM_MEMBER_REMOVE", payload: {
          client_id: client_id
        }
      })
    })
  }, [])

  useEffect(() => {
    const client_id = JSON.parse(localStorage.getItem("client_id")!);
    if (!roomData.room_name.trim()) return;

    socket.emit(
      "full-users-datalist",
      roomId,
      client_id,
      roomData.active_clients
    );
  }, [roomData]);

  useEffect(() => {
    socket.on("kicked-user", (client_id: string) => {
      const sessionToken = JSON.parse(localStorage.getItem("client_id")!)

      dispatch({
        type: "ROOM_MEMBER_REMOVE",
        payload: { client_id }
      })

      if (client_id === sessionToken) {
        socket.disconnect()
        dispatch({ type: "ERROR", payload: "You have been kicked out from" })
        dispatch({ type: "CLOSE_SETTINGS" })
      }
    })

    console.log();


    socket.on("banned-user", (client_id: string) => {
      socket.disconnect()
      dispatch({
        type: "ROOM_MEMBER_REMOVE",
        payload: { client_id }
      })
      dispatch({ type: "ERROR", payload: "You have been banned from this room" })
    })
  })

  const handleClickOutside = (event: any): void => {
    if (usersRef.current && !usersRef.current!.contains(event.target)) {
      dispatch({type: "TOGGLE_MEMBER_FALSE", payload: false})
    }
  };

  //fire "handleClickOutside()"
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <div className={darkTheme ? `current_online_users dark ${userMenu ? "open" : ""}` : `current_online_users ${userMenu ? "open" : ""}`} ref={usersRef}>
      {roomData.active_clients.map((member) => {
        return (
          <ActiveUser
            username={member.client_name}
            profile_src={member.client_profile}
            client_id={member.client_id}
            key={member.client_id}
          />
        );
      })}
    </div>
  );
};

export default UsersDashboard;
