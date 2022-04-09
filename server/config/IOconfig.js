const socketIoConfig = {
	cors: {
		origin: "https://jetchat.netlify.app/",
		methods: ["GET", "POST"],
		enabledTransports: ["ws", "wss"],
		transports: ['websocket']
	}
}

module.exports = {socketIoConfig}