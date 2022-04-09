import {useState, useEffect} from 'react'
import  {useSelector} from "react-redux"
import {RoomCatalogProps} from "./RoomCatalog"
import RoomCatalog from './RoomCatalog'
import axios from 'axios'
import hostConfig from "../../../utils/hostconfig.json"
import "./style/user-rooms.css"

const UserRooms = () => {
  const [rooms, setRooms] = useState<RoomCatalogProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  

  useEffect(() => {
    const requestor = JSON.parse(localStorage.getItem("client_id")!)
    const authToken = JSON.parse(sessionStorage.getItem("s_t")!)

    axios.post(`${hostConfig.host}/client/rooms`,{
      requestor, authToken
    }).then(resp => {
      const {data} = resp

      setRooms(data.map((room:RoomCatalogProps) => {
        return {
          room_name: room.room_name,
          room_id: room.room_id,
          room_icon: room.room_icon
        }
      }))
    
      setIsLoading(false)

    }).catch(error => {
      const {err} = error.response.data
      console.log(err)
    })
  }, [])

  return (
    <div className='container-rooms-modal'>
      {
        !isLoading ?
      <>
      <h3 className={darkTheme ? "rooms-own-text dark": "rooms-own-text"}>Rooms you own</h3>
      <div className="rooms-catalog">
        {
          rooms.map((room) => {
            return <RoomCatalog {...room} key={room.room_id}/>
          })
        }
      </div>
      </>:
      <span className={!darkTheme ? 'loaderr dark' : 'loaderr'} style={{ top: "50%", left: "50%", position: "absolute", transform: "translate(-50%, -50%)" }} />
      }
    </div>
  )
}

export default UserRooms