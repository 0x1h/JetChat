require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = 3001;
const { socketIoConfig } = require("./config/IOconfig");
const Signup = require("./routes/SignupUser");
const UserData = require("./routes/UserData");
const cors = require("cors");
const Login = require("./routes/LoginUser");
const joinRoom = require("./routes/joinRoom")
const createRoom = require('./routes/createRoom')
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests sent by this ip, please try again in an hour !'
});


const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, socketIoConfig);
const connect = require("./socket/connect")

connect(io)

http.listen(process.env.PORT || port, () => {
  const port = http.address().port;
  console.log("App listening at", port);
});



app.use(express.json());
app.use(cors());

mongoose
.connect(process.env.DB_URL, { useNewUrlParser: true })
.then(() => {
  console.log("\x1b[35m", "Successfully connected to Database");
})
.catch((err) => console.log(err));

app.use("/", Signup);
app.use("/", Login);
app.use("/user", UserData);
app.use("/room", createRoom);
app.use("/room", joinRoom)
app.use(limiter);