require('dotenv').config()

const express = require("express")
const app = express()
const http = require('http')   
const port = 3001
const server = http.createServer(app);
const mongoose = require("mongoose")
const Signup = require("./routes/SignupUser")
const cors = require('cors')
 
app.use(express.json())
app.use(cors())

const io = require('socket.io')().listen(server);

mongoose 
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("\x1b[35m", "Successfully connected to Database")
  })
  .catch((err) => console.log(err))

server.listen(port, () => {
	console.log('server is running on', port)
});

app.use("/", Signup)