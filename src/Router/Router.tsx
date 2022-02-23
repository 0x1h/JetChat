import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../Components/Home/Home"
import Navbar from "../Components/Navbar"


const Router = () => {
  return (
	<BrowserRouter>
		<Navbar/>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/room/:roomId" />
			<Route path="/global" />
		</Routes>
	</BrowserRouter>
  )
}

export default Router