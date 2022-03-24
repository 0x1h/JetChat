const socketIoConfig = {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		enabledTransports: ["ws", "wss"],
		transports: ['websocket']
	}
}

module.exports = {socketIoConfig}