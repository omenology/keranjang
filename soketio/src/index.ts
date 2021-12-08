import { Server, Socket } from "socket.io";
import http from "http";

import { verifyToken, payload } from "@jwt/index";

interface ISocket extends Socket {
  decoded?: payload;
}

const server = http.createServer();
const io = new Server(server, {
  path: "/api-socket",
  cors: {
    origin: ["http://localhost"],
  },
});

const onlineUsers = new Set();

io.use(async (socket: ISocket, next) => {
  console.log(socket.handshake.headers);
  const token = socket.handshake.auth.token as string;
  const decoded = verifyToken(token);
  if (decoded.error) next(decoded.error);
  socket.decoded = decoded.data as payload;
  next();
});

io.on("connection", (socket: ISocket) => {
  if (socket.decoded) {
    const { userId, username } = socket?.decoded;

    onlineUsers.add(`${userId} ${username}`);
    io.emit("onlineUsers", Array.from(onlineUsers));

    socket.on(userId, (eventId: string, message: string) => {
      io.emit(eventId, { userId, message });
    });
  }

  socket.on("disconnected", (user: string) => {
    if (onlineUsers.delete(user)) {
      io.emit("onlineUsers", Array.from(onlineUsers));
      socket.removeAllListeners(user.split(" ")[0]);
      socket.disconnect(true);
    }
  });
});

server.listen(4001, () => {
  console.log("listening on 4001");
});
