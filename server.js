const io = require("socket.io")("3500");

const users = {};
io.on("connection", (socket) => {
  // console.log('new user');
  socket.emit("chat-msg", "Hello World");
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-msg", (msg) => {
    console.log(msg);
    socket.broadcast.emit("chat-msg", { msg: msg, name: users[socket.id] });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
