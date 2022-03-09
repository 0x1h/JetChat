import { FC, useState } from "react";
import { isEqualType } from "./RoomInfo";
import hostConfig from "../../../../utils/hostconfig.json"
import axios from "axios"
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const ConfirmChanges: FC<{
  changes: boolean;
  dark: boolean;
  newChanges: isEqualType;
}> = ({ changes, dark, newChanges }) => {
  const {host} = hostConfig
  const {roomId} = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  const saveChangesHandler = () => {
    const client_id = JSON.parse(localStorage.getItem("client_id")!);
    const secret_token = JSON.parse(sessionStorage.getItem("s_t")!);

    setIsLoading(true)

    axios.put(`${host}/room/changes/${roomId}`, {
      requestor: client_id,
      authToken: secret_token,
      room_icon: newChanges.room_icon.trim(),
      room_name: newChanges.room_name.trim()
    }).then(confirm => {
      const {msg, room_data} = confirm.data

      dispatch({type: "CHANGE_ROOM", payload: {
        room_name: room_data.room_name,
        room_icon: room_data.room_icon
      }})

      setIsLoading(false)
      
    }).catch(error => {
      const {err} = error.response.data

      if(err === "User not found" || err === "Invalid Authentiction"){
        dispatch({type: "CLOSE_SETTINGS"})
        dispatch({ type: "ERROR", payload:"Beep boop beep..? some error appeard, go back and join in room again" })
        dispatch({type: "CLEAR_ALL_THE_DATA"})

        localStorage.removeItem("client_id")
        sessionStorage.removeItem("s_t")
      }
      
    })
  }

  return (
    <div
      className={
        !changes
          ? `settings-confirm-changes hidden ${dark ? "dark" : ""}`
          : `settings-confirm-changes ${dark ? "dark" : ""}`
      }
    >
      <p>⚠️ There are some unsaved changes</p>
      <button onClick={saveChangesHandler}>{
        isLoading ? <span className="loaderr"></span> : "Save Changes"
      }</button>
    </div>
  );
};

export default ConfirmChanges;
