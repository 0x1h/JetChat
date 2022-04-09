import {FC, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import  {useSelector} from "react-redux"

export interface RoomCatalogProps {
  room_name: string,
  room_id: string,
  room_icon: string
}

const RoomCatalog: FC<RoomCatalogProps> = ({room_icon, room_id, room_name}) => {
  const navigate = useNavigate()
  const imageRef = useRef<HTMLDivElement>(null)
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

  const imageContext = (e: MouseEvent) => e.preventDefault()

  useEffect(() => {
    imageRef.current?.addEventListener("contextmenu", imageContext)

    return () => imageRef.current?.removeEventListener("contextmenu", imageContext)
  })

  return (
    <div className={darkTheme ? 'each-room-catalog dark' : 'each-room-catalog'} onClick={() => navigate(`/room/${room_id}`)} ref={imageRef}>
      <div className="image-frame">
        <img src={room_icon} alt="" draggable={false}/>
      </div>
      <p style={{
        marginTop: "20px",
        color: darkTheme ? "#FFF" : "#000",
        fontWeight: 500,
        fontSize: "0.9em",
        textAlign: "center"
      }}>{room_name.length < 15 ? room_name : `${room_name.slice(0, 15)}...`}</p>
    </div>
  )
}

export default RoomCatalog