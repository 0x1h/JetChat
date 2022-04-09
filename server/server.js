const express = require("express");
const mongoose = require("mongoose");
const DB_URL = require("./env.json").DB_URL
const cors = require("cors");
const { socketIoConfig } = require("./config/IOconfig");
const port = process.env.PORT || 3001;
const kickUser = require("./routes/High Orders/grantKickUser")
const changePicture = require("./routes/Settings/changeProfile")
const Signup = require("./routes/Global/SignupUser");
const userRooms = require("./routes/Global/UserRooms")
const banUser = require("./routes/High Orders/grantBanUser");
const UserData = require("./routes/Client/UserData");
const passwordChange = require("./routes/Settings/changePassword")
const deleteRoom  = require("./routes/High Orders/deleteRoom")
const newUserJoin = require("./routes/Client/addUserRoom")
const leaveUser = require("./routes/Client/leaveRoom")
const Login = require("./routes/Global/LoginUser");
const joinRoom = require("./routes/Client/joinRoom")
const createRoom = require('./routes/Global/createRoom') 
const unBanUser = require("./routes/High Orders/unbanUser")
const transferOwner = require("./routes/High Orders/transferOwnerShip")
const changeUsername= require("./routes/Settings/changeUsername")
const rateLimit = require('express-rate-limit'); 
const changeRoom = require("./routes/High Orders/changeRoom");

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
    socket.to(room).emit("leave", client_id) 
  })

  socket.on("kick", (room, client_id) => {
    socket.to(room).emit("kicked-user", client_id)
  })

  socket.on("transferShip", (room, client_id) => {
    socket.to(room).emit("transferShip-user", client_id)
  })

  socket.on("ban", (room, client_id) => {
    socket.to(room).emit("banned-user", client_id)
  })
})    

http.listen(port, () => {
  const port = http.address().port;
  console.log("App listening at", port);
});

app.use(express.json());
app.use(cors());

mongoose
.connect(DB_URL, { useNewUrlParser: true })
.then(() => {
  console.log("Successfully connected to Database");
})
.catch((err) => console.log(err));

app.use("/", Signup);
app.use("/", Login);

app.use("/user", UserData);
app.use("/client", userRooms)

app.use("/room", createRoom);
app.use("/room", joinRoom)
app.use("/room", changeRoom)
app.use("/room", newUserJoin)
app.use("/room", leaveUser)
app.use("/room", kickUser)
app.use("/room", banUser)
app.use("/room", unBanUser)
app.use("/room", deleteRoom)
app.use("/room", transferOwner)

app.use("/settings", changePicture)
app.use("/settings", changeUsername)
app.use("/settings", passwordChange)

app.use(limiter); 