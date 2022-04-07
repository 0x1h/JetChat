import React, { FormEvent } from 'react'
import "./style/change-form.css"
import { useSelector } from 'react-redux';

const ChangePicture = () => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

  const submitPhoto = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <form className={darkTheme ? 'change-profile-picture dark' : 'change-profile-picture'} onSubmit={submitPhoto}>
      <input type="text" placeholder='Image URL'/>
      <button name="reset profile" value="reset profile" className={darkTheme ? "reset-avatar dark" : "reset-avatar"} type="button">Reset Profile</button>
      <button className='upload-photo-btn' type='submit'>Upload Photo</button>
    </form>
  )
}

export default ChangePicture