const socketIoConfig = {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		enabledTransports: ["ws", "wss"],
	}
}

module.exports = {socketIoConfig}