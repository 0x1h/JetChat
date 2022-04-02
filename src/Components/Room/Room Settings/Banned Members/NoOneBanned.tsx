import React from 'react'
import BanIcon from "./Assets/ban_icon.png"
import { useSelector } from 'react-redux'
import w from "./Assets/EmptyBanlistWords.json"

const {i} = w

const noneBanned: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  height: "calc(100% - 150px)"
}

const NoOneBanned = () => {
  const rNumber: number = Math.floor(Math.random() * i.length)
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  
  return (
    <div className='none-banned-ui' style={noneBanned}>
      <img src={BanIcon} alt="" draggable={false} style={{
        width: "200px"
      }}/>
      <h3 style={{
        textAlign: "center",
        color: darkTheme ? "#FFF" : "#000",
        marginTop: '40px',
        fontWeight: 500
      }}>{i[rNumber]}</h3>
    </div>
  )
}

export default NoOneBanned