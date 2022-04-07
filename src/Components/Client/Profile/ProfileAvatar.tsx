import { useEffect, useMemo, useState } from 'react'
import "./style/profile_avatar.css"
import { useSelector } from 'react-redux'
import {getBase64} from "../../../utils/getBase64"
import getAverageColor from 'get-average-color'
import hostConfig from "../../../utils/hostconfig.json"
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

interface userDataType {
  username: string,
  profile_src: string,
  created_at: string,
  main_color: string
}

const ProfileAvatar = () => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const [userData, setUserData] = useState<userDataType>({
    username: "",
    profile_src: "",
    created_at: "",
    main_color: ""
  })
  const navigate = useNavigate()
  const getMainColor = useMemo(() => {
    let baseURL: string = ""

    getBase64("https://cdn.discordapp.com/attachments/916412212594225242/960978514268524684/unknown.png", (dataURL) => {
      baseURL = dataURL as string
    })

  }, [userData.profile_src])


  useEffect(() => {
    const requestor = localStorage.getItem("client_id")
    const authToken = sessionStorage.getItem("s_t")

    if(requestor == null || authToken == null){
      return navigate("/")
    }

    axios.post(`${hostConfig.host}/user/${JSON.parse(requestor)}`, {
      requestor: JSON.parse(requestor),
      authToken: JSON.parse(authToken)
    }).then(resp => {
      const {username, createdAt, profile_src, main_color} =  resp.data

      console.log(resp.data);
      

      setUserData({main_color, username, created_at: createdAt, profile_src})


    
    })
  }, [])
  
  console.log(userData);
  

  return (
    <div className={darkTheme ? 'profile_avatar_container dark' : 'profile_avatar_container'}>
      <div className="profile-background">
        <div className="user-avatar" style={{backgroundColor: userData.main_color}}>
          <img src={userData.profile_src} alt="" draggable={false} />
        </div>
        <h1>{userData.username}</h1>
        <div className="background-wrapper" style={{backgroundColor: userData.main_color}}/>
      </div>
    </div>
  )
}

export default ProfileAvatar