import { FC, FormEvent, useEffect, useMemo, useState } from 'react'
import { State } from '../../../Hooks/Settings/Usernamehandler';
import { useDispatch, useSelector } from 'react-redux';
import hostConfig from "../../../utils/hostconfig.json"
import axios from 'axios';

const UsernameChange: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const dispatch = useDispatch()
  const [requestLoad, setRequestLoad] = useState<boolean>(false)
  const [saved, setSaved] = useState(false)
  const [isError, setIsError] = useState<string>("")
  const usernameHandle = useSelector(
    (state: { UsernameHandler: State }) => state.UsernameHandler
  );
  const anyChanges = useMemo(() => {
    const { username, new_username } = usernameHandle

    if (username !== new_username && new_username.length > 3) {
      return true
    }

    return false
  }, [usernameHandle])

  useEffect(() => {
    if(saved){
      setTimeout(() => {
        setSaved(false)
      }, 2000)
    }
  }, [saved])

  useEffect(() => {
    setIsError("")
  }, [usernameHandle])

  const submitUsername = (e: FormEvent) => {
    e.preventDefault()

    if (!anyChanges || requestLoad) return

    setRequestLoad(true)

    const requestor = JSON.parse(localStorage.getItem("client_id") as string)
    const authToken = JSON.parse(sessionStorage.getItem("s_t") as string)

    axios.put(`${hostConfig.host}/settings/change_username`, {
      requestor, authToken, new_username: usernameHandle.new_username
    })
    .then((resp) => {
      if(resp.data.success){
        setSaved(true)
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
        dispatch({
          type: "SPECIFIC_KEY_UPDATE",
          payload: {
            key: "username",
            value: resp.data.username
          }
        })
      }
      setRequestLoad(false)
    })
    .catch(error => {
      const {err} = error.response.data

      if(err){
        setIsError(err)
      }
      setRequestLoad(false)
    })
  }
  

  return (
    <form className={darkTheme ? 'username-change-container dark' : 'username-change-container'} onSubmit={submitUsername}>
      {
        isLoading ?
          <span className={!darkTheme ? 'loaderr dark' : 'loaderr'} style={{ top: "50%", left: "50%", position: "absolute", transform: "translate(-50%, -100%)" }} />
          : <>
            <h3>Change Username</h3>
            <label htmlFor="" style={{ textAlign: "left" }}>Username</label>
            <input type="text" placeholder='Username' name="username" autoComplete='off' value={usernameHandle.new_username} onChange={(e) => {
              dispatch({
                type: "FILL_SETTINGS_USERNAME",
                payload: {
                  key: "new_username",
                  value: e.target.value.trim()
                }
              })
            }}
            maxLength={15}
            />
            <button type='button' name="reset username" value="reset username" className="reset-username" onClick={() => {
              dispatch({
                type: "FILL_SETTINGS_USERNAME",
                payload: {
                  key: "new_username",
                  value: usernameHandle.username
                }
              })
            }}>Reset Username</button>
            <button className={anyChanges ? 'upload-username-btn' : 'upload-username-btn disabled'} type='submit'>{
              requestLoad 
              ? <span className='loaderr'/>
              : "Change Username"
            }</button>
            {
              isError && 
              <div className="response-warn">
                {isError}
              </div>
            }
            {
              saved && 
              <div className="response-warn green">
                Changes has saved
              </div>
            }
          </>
      }
    </form>
  )
}

export default UsernameChange