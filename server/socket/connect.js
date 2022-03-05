const socket = (io) => {
	io.on("connection", (socket) => {

		socket.on("send-message", (msg, room) => {
			// socket.to(room).emit("receive", msg)
			console.log(msg)			
		});

	})
}



module.exports = socket