import {FC, useState, FormEvent, useMemo, useRef} from 'react'
import hostConfig from "../../../../utils/hostconfig.json"
import { State } from "../../../../Hooks/Client/createRoomReducer";
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import "./style/confirm.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ConfirmDelete: FC<{closeModal: () => void}> = ({closeModal}) => {
  const [input, setInput] = useState<string>("")
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {roomId} = useParams()
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const roomData = useSelector(
    (state: { roomData: State }) => state.roomData
  );
  const acceptRequest = useMemo( () => {
    if(roomData.room_name === input) return true
    return false
  }, [input])
  
  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    if(!acceptRequest) return

    const client_id = JSON.parse(localStorage.getItem("client_id")!);
    const secret_token = JSON.parse(sessionStorage.getItem("s_t")!);

    setIsLoading(true)

    axios.put(`${hostConfig.host}/room/delete/${roomId}`, {
      authToken: secret_token,
      requestor: client_id,
    }).then(resp => {
      if(resp.data.success){
        setIsLoading(false)
        dispatch({type: "CLOSE_SETTINGS"})
        closeModal()
        dispatch({ type: "ERROR", payload: "Room Successfully removed, create new one or see you later"})
      }
    })
  }
  

  return (
    <motion.form className={darkTheme ? "confirm-delete-modal dark" : "confirm-delete-modal"} onSubmit={submitForm}>
      <h3>Delete "{roomData.room_name}"</h3>
      <p style={{marginTop: "10px"}}>Are you sure, you want to delete that room? If you will do that you can't back it</p>
      <p style={{marginTop: "5px"}}>If yes, then input room name to accept you really want to delete that room</p>
      <input type="text" placeholder='Enter Room Name' value={input} onChange={e => setInput(e.target.value)}/>
      {
        acceptRequest &&
        <div className="delete-btn-wrapper">
          <button type='submit'>
            {isLoading ? <span className='loaderr' /> : "Delete"}
          </button>
        </div>
      }
    </motion.form>
  )
}

export default ConfirmDelete