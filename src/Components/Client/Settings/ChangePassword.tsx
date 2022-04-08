import { FormEvent, FC } from 'react'
import { useSelector } from 'react-redux';

const ChangePassword: FC<{isLoading: boolean}> = ({isLoading}) => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

  const submitPassword  = (e: FormEvent) => {
    e.preventDefault()
  }
  

  return (
    <form className={darkTheme ? 'password-change-container dark' : 'password-change-container'} onSubmit={submitPassword}>
      {
        isLoading ? 
        <span className={!darkTheme ? 'loaderr dark' : 'loaderr'} style={{ top: "50%", left: "50%", position: "absolute", transform: "translate(-50%, -100%)" }} />
        : <>
          <h3>Change Password</h3>
      <label htmlFor="" style={{textAlign: "left"}}>Old Password</label>
      <input type="text" placeholder='Your Old Password' name="username" autoComplete='off'/>
      <label htmlFor="" style={{textAlign: "left"}}>New Password</label>
      <input type="text" placeholder='Your New Password' name="username" autoComplete='off'/>
      <button className='upload-pass-btn' type='submit' style={{marginBottom: "150px"}}>Change Password</button>
        </>
      }
    </form>
  )
}

export default ChangePassword