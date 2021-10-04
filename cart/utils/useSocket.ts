import { useEffect, useState } from "react";
import { useAuth } from "../context";

import { Socket, io } from "socket.io-client";

interface ISocket extends Socket {
  _callbacks?: object;
}

export const useSocket = () => {
  const { state } = useAuth();
  const [socket, setSocket] = useState<ISocket>(null);
  const [onlineUser, setOnlineUser] = useState<string[]>([]);

  useEffect(() => {
    if (state.token) {
      let initSocket = io("http://localhost:4001/", {
        auth: {
          token: state.token,
        },
      });
      initSocket.on("onlineUsers", (data) => {
        setOnlineUser(data);
      });
      setSocket(initSocket);
      return () => {
        initSocket.off("onlineUsers");
        initSocket.emit("disconnected", `${state.user.id} ${state.user.username}`);
      };
    }
  }, [state.user]);

  return { socket, onlineUser };
};
