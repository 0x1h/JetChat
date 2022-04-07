import  { FormEvent } from 'react'
import { useSelector } from 'react-redux';

const UsernameChange = () => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  
  const submitUsername = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <form className={darkTheme ? 'username-change-container dark' : 'username-change-container'} onSubmit={submitUsername}>
      <h3>Change Username</h3>
      <label htmlFor="" style={{textAlign: "left"}}>Username</label>
      <input type="text" placeholder='Username' name="username" autoComplete='off'/>
      <button className='upload-username-btn' type='submit'>Change Username</button>
    </form>
  )
}

export default UsernameChange