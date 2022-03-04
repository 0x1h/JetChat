const socket = (io) => {
	io.on("connection", (socket) => {
		socket.on("send-message", (msg) => {
			socket.broadcast.emit("receive", msg);
		});
	})
}



module.exports = socket