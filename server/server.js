const {socketIoConfig} = require("./config")
const io = require('socket.io')(3000, socketIoConfig)

io.on("connection", socket => {
	socket.on("send-message", (msg, room) => {
		if(room === ""){
			socket.broadcast.emit("receive", msg)
		}else{
			socket.to(room).emit("receive", msg)
		}
	})
})