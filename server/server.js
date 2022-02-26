require('dotenv').config()

const express = require("express")
const app = express()
const http = require('http')   
const mongoose = require("mongoose")
const port = 3001
const server = http.createServer(app);
const Signup = require("./routes/SignupUser")
const UserData  = require("./routes/UserData")
const cors = require('cors')
const Login = require("./routes/LoginUser") 

app.use(express.json())
app.use(cors())

const io = require('socket.io')().listen(server);

mongoose 
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("\x1b[35m", "Successfully connected to Database")
  })
  .catch((err) => console.log(err))

app.listen(port, () => {
  console.log("Server is running on", port);
})

app.use("/", Signup)
app.use("/", Login)
app.use("/user", UserData)