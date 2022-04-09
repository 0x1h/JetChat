import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const BrokenURL = () => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const navigate = useNavigate()

  return (
    <div className='broken-url-wrapper'>
      <div className="ufo-wrapper">
        <img src="/assets/not-found.gif" alt="" />
      </div>
        <h3
        className={darkTheme ? "not-found-text dark" : "not-found-text"}
        >Oopss... your input URL literally doesn't exist on this website</h3>
        <button onClick={() => navigate("/")}>Home</button>
    </div>
  )
}

export default BrokenURL