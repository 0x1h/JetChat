import { FormEvent, FC, useState, useEffect } from 'react'
import { Input } from '../../Home/Sign up/SignUp';
import { useSelector } from 'react-redux';
import hostConfig from "../../../utils/hostconfig.json"
import axios from 'axios';

const {host} = hostConfig

const ChangePassword: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const [password, setPassword] = useState({
    old_password: "",
    new_password: ""
  })
  const [requestLoad, setRequstLoad] = useState(false)
  const [warns, setWarn] = useState<string[]>([])
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    
    if(password.new_password.length < 8){
      //@ts-ignore
      return setWarn([...new Set([...warns, "New password must be 8 or more characters long"])])
    }

    return setWarn([])

  }, [password])

  const submitPassword = (e: FormEvent) => {
    e.preventDefault()

    if(warns.length > 0 || !password.new_password.trim() || !password.old_password.trim() || requestLoad){
      return
    }


    const requestor = JSON.parse(localStorage.getItem("client_id") as string)
    const authToken = JSON.parse(sessionStorage.getItem("s_t") as string)
    const {new_password, old_password} = password

    setRequstLoad(true)
    axios.put(`${host}/settings/change_password`, {
      requestor, authToken, new_password, old_password
    }).then((resp) => {
      if(resp.data.success){
        sessionStorage.setItem("s_t", JSON.stringify(resp.data.authToken))
        setRequstLoad(false)

        setSuccess(true)
        setPassword({
          new_password: "",
          old_password: ""
        })
        setTimeout(() => {
          setSuccess(false)
        }, 2000)
      }
    })
    .catch(error => {
      const {err} = error.response.data
      setWarn([err])
      setRequstLoad(false)
    })
  }

  const inputhandle = (e: Input) => {
    const name: string = e.target.name
    const value: string = e.target.value

    setPassword((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  
  

  return (
    <form className={darkTheme ? 'password-change-container dark' : 'password-change-container'} onSubmit={submitPassword}>
      {
        isLoading ?
          <span className={!darkTheme ? 'loaderr dark' : 'loaderr'} style={{ top: "50%", left: "50%", position: "absolute", transform: "translate(-50%, -100%)" }} />
          : <>
            <h3>Change Password</h3>
            <label htmlFor="" style={{ textAlign: "left" }}>Old Password</label>
            <input type="password" placeholder='Your Old Password' name="old_password" autoComplete='off' value={password.old_password} onChange={inputhandle} />
            <label htmlFor="" style={{ textAlign: "left" }}>New Password</label>
            <input type="password" placeholder='Your New Password' name="new_password" autoComplete='off' value={password.new_password} onChange={inputhandle} />
            {
              (warns.length > 0 && password.new_password.length)
              && <div className="password-warns">
              <ul>
                {
                  warns.map((warn, i) => {
                    return <li key={i}>{warn}</li>
                  })
                }
              </ul>
              </div>
            }
            {
              success &&
              <div className="password-warns success">
                Successfully Changed
              </div>
            }
            <button className={warns.length ? 'upload-pass-btn disabled': 'upload-pass-btn'} type='submit' style={{ marginBottom: "150px" }}>{
              requestLoad 
              ? <span className='loaderr'/>
              : "Change Password" 
            }</button>
          </>
      }
    </form>
  )
}

export default ChangePassword