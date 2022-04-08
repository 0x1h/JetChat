import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import hostConfig from "../../../utils/hostconfig.json"
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import "./style/profile_avatar.css"

interface userDataType {
  username: string,
  profile_src: string,
  created_at: string,
  main_color: string
}

const ProfileAvatar = () => {
  const imageRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
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

  useEffect(() => {
    const requestor = localStorage.getItem("client_id")
    const authToken = sessionStorage.getItem("s_t")

    if (requestor == null || authToken == null) {
      return navigate("/")
    }

    axios.post(`${hostConfig.host}/user/${JSON.parse(requestor)}`, {
      requestor: JSON.parse(requestor),
      authToken: JSON.parse(authToken)
    }).then(resp => {
      const { username, createdAt, profile_src, main_color } = resp.data
      setUserData({ main_color, username, created_at: createdAt, profile_src })
      setIsLoading(false)
    })
  }, [])

  const imageContext = (e: MouseEvent) => e.preventDefault()

  useEffect(() => {
    imageRef.current?.addEventListener("contextmenu", imageContext)

    return () => imageRef.current?.removeEventListener("contextmenu", imageContext)
  })


  return (
    <div className={darkTheme ? 'profile_avatar_container dark' : 'profile_avatar_container'}>
      {
        isLoading
          ? <span className={!darkTheme ? 'loaderr dark' : 'loaderr'} style={{
            width: "45px",
            height: "45px"
          }}/>
          : <div className="profile-background">
            <div className="user-avatar" style={{ backgroundColor: userData.main_color }} ref={imageRef}>
              <img src={userData.profile_src} alt="" draggable={false} />
            </div>
            <h1>{userData.username}</h1>
            <div className="background-wrapper" style={{ backgroundColor: userData.main_color }} />
          </div>
      }
    </div>
  )
}

export default ProfileAvatar