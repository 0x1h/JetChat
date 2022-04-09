import React from 'react'
import BanIcon from "./Assets/ban_icon.png"
import { useSelector } from 'react-redux'
import w from "./Assets/EmptyBanlistWords.json"

const {i} = w

const NoOneBanned = () => {
  const rNumber: number = Math.floor(Math.random() * i.length)
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  
  return (
    <div className='none-banned-ui'>
      <img src={BanIcon} alt="" draggable={false}/>
      <h3
      className='random-none-banned-text' 
      style={{
        color: darkTheme ? "#FFF" : "#000",
      }}>{i[rNumber]}</h3>
    </div>
  )
}

export default NoOneBanned