require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = 3001;
const { socketIoConfig } = require("./config/IOconfig");
const Signup = require("./routes/SignupUser");
const UserData = require("./routes/UserData");
const cors = require("cors");
const Login = require("./routes/LoginUser");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, socketIoConfig);

http.listen(process.env.PORT || port, () => {
  var port = http.address().port;
  console.log("App listening at", port);
});

io.on("connection", (socket) => {
  socket.on("send-message", (msg) => {
    socket.broadcast.emit("receive", msg);
  });
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
