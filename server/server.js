const express = require("express")
const app = express()
const {socketIoConfig} = require("./config")

const port = 3000

const io = require('socket.io')(port, socketIoConfig)

io.on("connection", socket => {
	socket.on("send-message", (msg, room) => {
		if(room === ""){
			socket.broadcast.emit("receive", msg)
		}else{
			socket.to(room).emit("receive", msg)
		}
	})
})

app.listen(port, () => {
	console.log("Server launched on", port);
})