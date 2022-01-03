import { Server, Socket } from "socket.io";
import http from "http";
import decodeToken from "jwt-decode";

interface ISocket extends Socket {
  decoded?: {
    userId: string;
    username: string;
    email: string;
  };
}

const server = http.createServer();
const io = new Server(server, {
  path: "/api-socket",
  cors: {
    origin: "*",
  },
});

const onlineUsers = new Set();

io.use(async (socket: ISocket, next) => {

  const authorization = socket.handshake.headers?.authorization;
  if (!authorization) throw Error("Unauthorized");

  const [type, token] = authorization?.split(" ");
  if (!type || !token) throw Error("Unauthorized");
  socket.decoded = decodeToken(token);
  
  next();
});

io.on("connection", (socket: ISocket) => {
  if (socket.decoded?.userId) {
    console.log(socket.decoded,"=-=-=-=-=-=-=");
    const { userId, username } = socket?.decoded;

    onlineUsers.add(`${userId} ${username}`);
    io.emit("onlineUsers", Array.from(onlineUsers));

    socket.on(userId, (eventId: string, message: string) => {
      io.emit(eventId, { userId, message });
    });
  }

  socket.on("disconnected", (user: string) => {
    console.log("onlineUsers",user, Array.from(onlineUsers));
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
