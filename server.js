const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*"
  }
});

http.listen(3001, () => {
  console.log("server started...");
  io.on("connection", (socket) => {
    console.log('user connected..', socket.id);
  });
});


// const io = require("socket.io")("3001");

// const users = {};
// io.on("connection", (socket) => {
//   // console.log('new user');
//   socket.emit("chat-msg", "Hello World");
//   socket.on("new-user", (name) => {
//     users[socket.id] = name;
//     socket.broadcast.emit("user-connected", name);
//   });
//   socket.on("send-msg", (msg) => {
//     console.log(msg);
//     socket.broadcast.emit("chat-msg", { msg: msg, name: users[socket.id] });
//   });
//   socket.on("disconnect", () => {
//     socket.broadcast.emit("user-disconnected", users[socket.id]);
//     delete users[socket.id];
//   });
// });
