const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  console.log(socket.id);
  socket.emit("ww", { id: socket.id, mgs: "msg" });
});
