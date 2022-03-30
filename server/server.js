require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = 3001;
const kickUser = require("./routes/grantKickUser")
const { socketIoConfig } = require("./config/IOconfig");
const Signup = require("./routes/SignupUser");
const banUser = require("./routes/grantBanUser");
const UserData = require("./routes/UserData");
const deleteRoom  = require("./routes/deleteRoom")
const cors = require("cors");
const newUserJoin = require("./routes/addUserRoom")
const leaveUser = require("./routes/leaveRoom")
const Login = require("./routes/LoginUser");
const joinRoom = require("./routes/joinRoom")
const createRoom = require('./routes/createRoom') 
const rateLimit = require('express-rate-limit'); 
const changeRoom = require("./routes/changeRoom");

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests sent by this ip, please try again in an hour !'
});
 
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, socketIoConfig);
 
io.on("connection",  socket => {
  socket.on("join",  (room, userInfo) => {
    socket.join(room)
    socket.to(room).emit("join",userInfo)
  })

	socket.on("send-message", async (msg, room) => {
    socket.join(room)
    socket.to(room).emit("receive", msg)
  })

  socket.on("room-changes", (room, room_changes) => {
    socket.to(room).emit("room-changes-obj", room_changes)
  })

  socket.on("leave", (room, client_id) => {
    // console.log(client_id);
    socket.to(room).emit("leave", client_id) 
  })

  socket.on("kick", (room, client_id) => {
    socket.to(room).emit("kicked-user", client_id)
  })

  socket.on("ban", (room, client_id) => {
    socket.to(room).emit("banned-user", client_id)
  })
})    

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
app.use("/room", changeRoom)
app.use("/room", newUserJoin)
app.use("/room", leaveUser)
app.use("/room", kickUser)
app.use("/room", banUser)
app.use("/room", deleteRoom)
app.use(limiter); 