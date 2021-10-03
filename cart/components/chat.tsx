import React, { useEffect, useState, useRef } from "react";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import { io, Socket } from "socket.io-client";

import { useAuth } from "../context";
import { useLocalForage } from "../utils";

import css from "../styles/chat.module.css";

interface IChatMsg {
  me?: string;
  him?: string;
}

const Chat = () => {
  const { state } = useAuth();
  const { instance } = useLocalForage();
  const refText = useRef(null);
  const refChatBox = useRef(null);
  const [socket, setSocket] = useState<Socket>(null);
  const [onlineUser, setOnlineUser] = useState<string[]>([]);
  const [[TIdUser, TUsername], setTarget] = useState<string[]>([]);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showListChat, setShowListChat] = useState<boolean>(false);

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
    }
  }, [state.token]);

  useEffect(() => {
    if (socket && state.user?.id) {
      socket.on(state.user?.id, async (data: { userId: string; message: string }) => {
        const messages: IChatMsg[] = (await instance.getItem(`${state.user?.id} ${data.userId}`)) || [];
        messages.push({ him: data.message });
        await instance.setItem(`${state.user?.id} ${data.userId}`, messages);

        appendChild(true, data.message);
      });
      return () => {
        socket.off("onlineUsers");
        socket.emit("disconnected", `${state.user.id} ${state.user.username}`);
      };
    }
  }, [socket, state.user]);

  const clickOnlineUsersHandler = async (target: string[]) => {
    refChatBox.current.textContent = "";
    setTarget(target);
    setShowChat(true);
    populateChat(`${state.user.id} ${target[0]}`);
  };

  // instance.keys((err, keys) => {
  //   console.log(keys);
  //   keys.forEach((val) => {
  //     console.log(val);
  //     if (val != "token") instance.removeItem(val);
  //   });
  // });

  const sendHandler = async () => {
    const messages: IChatMsg[] = (await instance.getItem(`${state.user?.id} ${TIdUser}`)) || [];
    messages.push({ me: refText.current.value });
    await instance.setItem(`${state.user?.id} ${TIdUser}`, messages);

    socket.emit(state.user?.id, TIdUser, refText.current.value);
    appendChild(false, refText.current.value);
    refText.current.value = "";
  };

  const populateChat = async (key: string) => {
    const messages: IChatMsg[] = (await instance.getItem(`${key}`)) || [];
    messages.forEach((val) => {
      appendChild(val?.him ? true : false, val.me || val.him);
    });
  };

  const appendChild = (him: boolean, msg: string) => {
    let div = document.createElement("div");
    div.className = `${css.chat} ${him ? css.him : css.my} d-flex justify-content-${him ? "start" : "end"} mb-1`;
    div.innerHTML = `<p class="m-0 p-1 rounded text-start">${msg}</p>`;

    refChatBox.current.appendChild(div);
    refChatBox.current.scrollTop = refChatBox.current.scrollHeight;
  };

  return (
    <div className={`d-flex flex-row-reverse align-items-end ${css.container}`}>
      <Card className={`${css.listChat} ${showListChat ? css.listChatOpen : css.listChatHide}`}>
        <Card.Header>Online Users</Card.Header>
        <Card.Body className="overflow-auto">
          <ul className="list-group list-group-flush">
            {onlineUser.map((val: string, index) => {
              const [idUser, username] = val.split(" ");
              if (idUser == state.user?.id) return null;
              return (
                <li key={index} onClick={() => clickOnlineUsersHandler([idUser, username])} className="list-group-item list-group-item-action" style={{ cursor: "pointer" }}>
                  {username}
                </li>
              );
            })}
          </ul>
        </Card.Body>
        <Button onClick={() => setShowListChat(!showListChat)} className={`${css.btnShowChat} `}>
          <i className={`fas fa-angle-${showListChat ? "right" : "left"}`} style={{ marginLeft: -2 }} />
        </Button>
      </Card>
      <Card style={{ height: "50%", minHeight: 290, width: 350, display: showChat ? "" : "none" }}>
        <Card.Header className="d-flex justify-content-between">
          <h5 className="m-0">{TUsername}</h5>
          <i onClick={() => setShowChat(false)} className="fas fa-times align-self-center" style={{ cursor: "pointer" }} />
        </Card.Header>
        <Card.Body>
          <div ref={refChatBox} className={`overflow-auto mb-2 pe-1 ${css.chatBox}`}>
            {/* <Spinner animation="border" variant="primary" className={`${css.loadingChat}`} />  */}
          </div>
          <div className="d-flex justify-content-between" style={{ position: "absolute", bottom: 9, width: "91%" }}>
            <Form.Control onKeyDown={(e) => (e.key == "Enter" ? sendHandler() : null)} ref={refText} type="text" placeholder="Message" className="me-2" />
            <Button onClick={sendHandler} className="btn btn-primary btn-sm">
              <i className="far fa-paper-plane" />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Chat;
