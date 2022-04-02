import axios from 'axios';
import { FC, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import hostConfig from "../../../../utils/hostconfig.json"
import "./style/unban.css"

const {host} = hostConfig

interface UnbanProps {
  username: string,
  profile_src: string,
  client_id: string,
  modalCloseOpen: () => void,
  removeBannedFromList: (client_id: string) => void
}

const UnbanConfirm: FC<UnbanProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const {roomId} = useParams()
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

  const acceptUnbanUser = () => {
    const client_id = JSON.parse(localStorage.getItem("client_id")!);
    const authToken = JSON.parse(sessionStorage.getItem("s_t")!);
    setIsLoading(true)

    axios.put(`${host}/room/unban.User/${roomId}`, {
      requestor: client_id,
      authToken,
      unBanUser: props.client_id
    }).then((resp) => {
      if(resp.data.success){
        props.modalCloseOpen()
        props.removeBannedFromList(props.client_id)
      }
      
    }).catch(err => {
      console.log(err.response.data.err);
    })
  }

  return (
    <div className='unban_blur-modal'>
      <div className={darkTheme ? "unban_accept-container dark" : "unban_accept-container"}>
        <h2>Unban {props.username}</h2>
        <p>Are you sure you want to unban <span className='bold'>{props.username}</span>
        <br />
        {' '}If you do that, <span className='bold'>{props.username}</span> will be able to rejoin to room</p>
        <div className="user-card">
          <div className="profile-frame">
            <img src={props.profile_src} alt="" draggable={false}/>
          </div>
          <p className='username'>{props.username}</p>
        </div>
        <div className="accept-container">
          <button onClick={props.modalCloseOpen}>Cancel</button>
          <button className='unban-btn' onClick={acceptUnbanUser}>{
            isLoading ? <span className='loaderr'/> : "Unban"
          }</button>
        </div>
      </div>
    </div>
  )
}

export default UnbanConfirm