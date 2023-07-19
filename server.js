const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.get("/", function(req, res, next) {
  res.sendFile(__dirname + "/src/index.html");
});

app.use(express.static("src"));

io.on("connection", function(socket) {
  console.log("client connected...");

  socket.on("join", function(data) {
    console.log(data);
  });

  socket.on("messages", function(data) {
    socket.emit("thread", data);
    socket.broadcast.emit("thread", data);
  });
});

server.listen(7777);
