import { useEffect } from "react"
import { socket } from "../App"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../Components/Home/Home"
import Navbar from "../Components/Navbar/Navbar"
import Room from "../Components/Room/Room"
import Profile from "../Components/Client/Profile/Profile"
import Settings from "../Components/Client/Settings/Settings"
import BrokenURL from "../Components/Home/BrokenURL"

const Router = () => {

	useEffect(() => {
    socket.emit("connect-socket")

    socket.on("success-connect", (alert) => {
      console.log(alert)
    })
     
  }, [])

  return (
	<BrowserRouter>
		<Navbar/>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/room/:roomId" element={<Room />}/>
			<Route path="/profile" element={<Profile />}/>
			<Route path="settings" element={<Settings/>}/>
			<Route path="*" element={<BrokenURL />}/>
		</Routes>
	</BrowserRouter>
  )
}

export default Router