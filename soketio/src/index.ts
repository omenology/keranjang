import { Server, Socket } from "socket.io";
import http from "http";

import { verifyToken, verifyTokenPromise, decodeToken, payload } from "@jwt/index";

interface ISocket extends Socket {
  decoded?: payload;
}

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const onlineUsers = new Set();

io.use(async (socket: ISocket, next) => {
  // const token = socket.handshake.auth.token as string;
  // const decodedToken = verifyToken(token);
  // if (!decodedToken.data) next(new Error("unauthorized"));
  // socket.decoded = decodedToken;
  try {
    const token = socket.handshake.auth.token as string;
    const decodedToken = await verifyTokenPromise(token);
    socket.decoded = decodedToken;
    next();
  } catch (error) {
    next(error as Error);
  }
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
