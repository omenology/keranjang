import React, { useEffect, useState, useRef } from "react";
import { GetServerSideProps } from "next";
import { Card, Button, Form } from "react-bootstrap";

import { useAuth, useUtils } from "../context";
import { GetServerSidePropsContextWithSession, withSession } from "../utils";

import css from "../styles/chat.module.css";

interface IChatMsg {
  me?: string;
  him?: string;
}
interface argsSocketType {
  userId: string;
  message: string;
}
const Chat = ({ tes }) => {
  const { state: authState } = useAuth();
  console.log("authState");
  const { socketio, localforage } = useUtils();

  const [onlineUser, setOnlineUser] = useState<string[]>([]);
  const [[TIdUser, TUsername], setTarget] = useState<string[]>([]);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showListChat, setShowListChat] = useState<boolean>(false);
  const [himMsg, setHimMsg] = useState<argsSocketType>({ userId: "", message: "" });

  const refText = useRef(null);
  const refChatBox = useRef(null);

  useEffect(() => {
    socketio.on("onlineUsers", (data) => {
      setOnlineUser(data);
    });
    socketio.on(authState.user?.id, async (data: argsSocketType) => {
      updateLocalMsg(true, data.userId, data.message);
      setHimMsg(data);
    });
  }, []);

  useEffect(() => {
    if (TIdUser == himMsg.userId) appendChild(true, himMsg.message);
  }, [himMsg]);

  const clickOnlineUsersHandler = async (target: string[]) => {
    refChatBox.current.textContent = "";
    setTarget(target);
    setShowChat(true);
    populateChat(`${authState.user.id} ${target[0]}`);
  };

  const sendHandler = async () => {
    updateLocalMsg(false, TIdUser, refText.current.value);
    appendChild(false, refText.current.value);
    socketio.emit(authState.user?.id, TIdUser, refText.current.value);
    refText.current.value = "";
  };

  const populateChat = async (key: string) => {
    const messages: IChatMsg[] = (await localforage.getItem(`${key}`)) || [];
    messages.forEach((val) => {
      appendChild(val?.him ? true : false, val.me || val.him);
    });
  };

  const updateLocalMsg = async (him: boolean, TargetUserId: string, msg: string) => {
    const localMsg: IChatMsg[] = (await localforage.getItem(`${authState.user.id} ${TargetUserId}`)) || [];
    localMsg.push({ [him ? "him" : "me"]: msg });
    await localforage.setItem(`${authState.user?.id} ${TargetUserId}`, localMsg);
  };

  const appendChild = (him: boolean, msg: string) => {
    let div = document.createElement("div");
    div.className = `${css.chat} ${him ? css.him : css.my} d-flex justify-content-${him ? "start" : "end"} mb-1`;
    div.innerHTML = `<p class="m-0 p-1 rounded text-start">${msg}</p>`;

    refChatBox.current.appendChild(div);
    refChatBox.current.scrollTop = refChatBox.current.scrollHeight;
  };

  return (
    <div className={`d-flex flex-row-reverse align-items-end ${css.container} ${showListChat ? css.listChatOpen : css.listChatHide}`}>
      <Card className={`${css.listChat} `}>
        <Card.Header>Online Users</Card.Header>
        <Card.Body className="overflow-auto">
          <ul className="list-group list-group-flush">
            {onlineUser.map((val: string, index) => {
              const [idUser, username] = val.split(" ");
              if (idUser == authState.user?.id) return null;
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
      <Card className={`${css.cardChatBox}`} style={{ display: showChat ? "" : "none" }}>
        <Card.Header className="d-flex justify-content-between">
          <h5 className="m-0">{TUsername}</h5>
          <i onClick={() => setShowChat(false)} className="fas fa-times align-self-center" style={{ cursor: "pointer" }} />
        </Card.Header>
        <Card.Body>
          <div ref={refChatBox} className={`overflow-auto mb-2 pe-1 ${css.chatBox}`}></div>
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
