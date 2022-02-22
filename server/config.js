const socketIoConfig = {
	cors: {
		origin: "http://localhost:3001",
		methods: ["GET", "POST"]
	}
}

module.exports = {socketIoConfig}