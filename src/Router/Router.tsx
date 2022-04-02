import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../Components/Home/Home"
import Navbar from "../Components/Navbar/Navbar"
import Room from "../Components/Room/Room"


const Router = () => {
  return (
	<BrowserRouter>
		<Navbar/>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/room/:roomId" element={<Room />}/>
			<Route path="/global" />
		</Routes>
	</BrowserRouter>
  )
}

export default Router