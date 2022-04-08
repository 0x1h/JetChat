import { FormEvent, useEffect, useMemo, useState,  FC} from 'react'
import { State } from '../../../Hooks/Settings/Photohandler';
import { useDispatch, useSelector } from 'react-redux';
import hostConfig from "../../../utils/hostconfig.json"
import "./style/change-form.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePicture: FC<{loaderHandle: (bool: boolean) => void, isLoading: boolean}> = ({loaderHandle, isLoading}) => {
  const photoHandle = useSelector(
    (state: { PhotoHandler: State }) => state.PhotoHandler
  );
  const [requestLoad, setRequestLoad] = useState<boolean>(false)
  const anyChanges = useMemo(() => {
    const {profile_src, new_profile_src} = photoHandle
    
    if(profile_src !== new_profile_src){
      return true
    }
 
    return false

  }, [photoHandle])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

  const submitPhoto = (e: FormEvent) => {
    e.preventDefault()
    if(!anyChanges || isLoading || requestLoad) return

    const requestor = JSON.parse(localStorage.getItem("client_id") as string)
    const authToken = JSON.parse(sessionStorage.getItem("s_t") as string)

    setRequestLoad(true)

    axios.put(`${hostConfig.host}/settings/profile_change`, {
      requestor, authToken, profile_picture: photoHandle.new_profile_src
    }).then(resp => {
      if(resp.data.success){
        dispatch({type: "FILL_SETTINGS_DATA", payload: {
          key: "profile_src",
          value: resp.data.new_data.profile_src
        }})
        dispatch({type: "FILL_SETTINGS_DATA", payload: {
          key: "new_profile_src",
          value: resp.data.new_data.profile_src
        }})
        dispatch({
          type: "SPECIFIC_KEY_UPDATE",
          payload: {
            key: "profile_src",
            value: resp.data.new_data.profile_src
          }
        })
        setRequestLoad(false)
      }
    })
    .catch(err => {
      console.log(err);
      setRequestLoad(false)
    })
  }

  useEffect(() => {
    const requestor = localStorage.getItem("client_id") as string
    const authToken = sessionStorage.getItem("s_t") as string

    if(requestor == null || authToken == null){
      navigate("/")
    }

    if(photoHandle.new_profile_src.trim() && photoHandle.profile_src.trim()) return
    
    loaderHandle(true)

    axios.post(`${hostConfig.host}/user/${JSON.parse(requestor)}`, {
      requestor: JSON.parse(requestor),
      authToken: JSON.parse(authToken)
    }).then(resp => {
      dispatch({type: "FILL_SETTINGS_DATA", payload: {
        key: "profile_src",
        value: resp.data.profile_src
      }})
      dispatch({type: "FILL_SETTINGS_DATA", payload: {
        key: "new_profile_src",
        value: resp.data.profile_src
      }})
      dispatch({
        type: "FILL_SETTINGS_USERNAME",
        payload: {
          key: "username",
          value: resp.data.username
        }
      })
      dispatch({
        type: "FILL_SETTINGS_USERNAME",
        payload: {
          key: "new_username",
          value: resp.data.username
        }
      })
      loaderHandle(false)
    })
    .catch(error => {
      const {err} = error.response.data
      if(err === "Invalid arguments" || err=== "User not found" || err === "Invalid Authentiction"){
        navigate("/")
      }
    })
  }, [])

  return (
    <form className={darkTheme ? 'change-profile-picture dark' : 'change-profile-picture'} onSubmit={submitPhoto}>
      <input type="text" placeholder='Image URL' value={photoHandle.new_profile_src} onChange={e => dispatch({type: "FILL_SETTINGS_DATA", payload: {
        key: "new_profile_src",
        value: e.target.value
      }})}/>
      <button name="reset profile" value="reset profile" className={"reset-avatar dark"} type="button" onClick={() => {
        dispatch({type: "FILL_SETTINGS_DATA", payload: {
          key: "new_profile_src",
          value: photoHandle.profile_src
        }})
      }}>Reset Profile</button>
      <button className={!anyChanges ? 'upload-photo-btn disabled': 'upload-photo-btn'} type='submit'>{
        requestLoad 
        ? <span className='loaderr'/>
        : "Upload Photo"
      }</button>
      {
        !photoHandle.new_profile_src.trim()
        && <div className='warn-alert'>If you want to get randomly generated avatar keep input field blank</div>
      }
    </form>
  )
}

export default ChangePicture