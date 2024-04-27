import express from "express";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const app = express();
const httpServer = app.listen(8080, () => {
  console.log("HTTP server running on port 8080...");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
  },
});

io.on("connection", (socket) => {
  socket.on("error", (err) => console.error(err));

  socket.emit("successConnection", "Connected with server");

  socket.on("join", function (data) {
    socket.join(data.email); // We are using room of socket io
  });

  socket.on("send_notification", (data) => {
    io.sockets.in(data.email).emit("get_notification", {
      id: uuidv4(),
      message: data?.message,
      referenceId: data?.referenceId,
      type: data?.type,
      createdOn: new Date(),
    });
  });
});
