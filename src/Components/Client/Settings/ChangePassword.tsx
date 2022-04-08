import { FormEvent, FC, useState, useEffect } from 'react'
import { Input } from '../../Home/Sign up/SignUp';
import { useSelector } from 'react-redux';

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

  useEffect(() => {
    
    if(password.new_password.length < 8){
      //@ts-ignore
      return setWarn([...new Set([...warns, "New password must be 8 or more characters long"])])
    }

    return setWarn([])

  }, [password])

  const submitPassword = (e: FormEvent) => {
    e.preventDefault()
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
            <button className={warns.length ? 'upload-pass-btn': 'upload-pass-btn disabled'} type='submit' style={{ marginBottom: "150px" }}>Change Password</button>
          </>
      }
    </form>
  )
}

export default ChangePassword