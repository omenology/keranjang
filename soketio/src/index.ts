import { Server } from "socket.io";

import http from "http";

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let ids = new Set();
let num = 0;

io.on("connection", (socket) => {
  console.log(socket.handshake.auth);
  socket.on("connected", (evn: any) => {
    ids.add(evn);
    let a = Array.from(ids);
    console.log(a);
    socket.broadcast.emit("ids", { ids: a, num: num++ });
  });

  socket.on("disconnected", (evn: any) => {
    if (ids.delete(evn)) {
      let a = Array.from(ids);
      console.log(a);
      socket.broadcast.emit("ids", { ids: a, num: num++ });
    }
  });

  socket.on("idweb1", (id, msg) => {
    console.log(id, msg);
  });
});

server.listen(3000, () => {
  console.log("listening on 3000");
});
