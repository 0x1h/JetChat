const socketIoConfig = {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
}

module.exports = {socketIoConfig}