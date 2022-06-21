const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users = {};

io.on("connection", (socket) => {
  console.log('user connected..', socket.id);
  // socket.emit("test", "Hello World");
  socket.on("new-user", (name) => {
    console.log('name',name);
    console.log('old ', users);
    users[socket.id] = name;
    console.log('new ', users);
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-msg", (msg) => {
    console.log('users',users);
    console.log('msg',msg);
    console.log('username',users[socket.id]);
    socket.broadcast.emit("chat-msg", { msg: msg, name: users[socket.id] });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

server.listen(3001, () => {
  console.log("server started...");
});

