import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Messages, MainContainer } from "./styles";
import { messageService } from "../../services";
import { handleError } from "../../handlers/ErrorHandler";
import { useNavigate } from "react-router-dom";
import ChatInput from "../ChatInput";

const ChatCointainer = ({ room, socket, user }) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  let navigate = useNavigate();

  // const msgs = [
  //   { userId: "62eac45acf2b9cb98552a02e", name: "user 1", message: "hola" },
  //   { userId: "62eac45acf2b9cb98552a02e", name: "user 1", message: "Como estas?" },
  //   { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
  //   { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
  //   { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
  //   { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
  //   { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
  //   { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
  //   { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
  //   { userId: "62eac45acf2b9cb98552a02e", name: "user 1", message: "holaholaholaholaholaholaholaholaholaholaholaholaholaholaholaholaholaholahola" },
  // ];

  useEffect(() => {
    socket.current.emit("USER-CONNECT", user.username, user.userId, room.roomId);
    messageService
      .getMessagesFromRoom(room.roomId)
      .then((res) =>
        res.failure ? handleError(res.status) : setMessages(res.data.messages)
      );
  }, [room]);

  // useEffect(() => {
  //   const getCurrentChat = async () => {
  //     if (currentRoom) {
  //       await JSON.parse(
  //         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //       )._id;
  //     }
  //   };
  //   getCurrentChat();
  // }, [currentRoom]);

  useEffect(() => {
    console.log(messages)
  }, [messages])

  const handleSendMessage = (message, setMessage) => {
    socket.current.emit("MSG-SEND", message, room.roomId, () =>
      setMessage("")
    );
    messageService
      .sendMessage({
        from: {
          name: user.username,
          userId: user.userId,
        },
        text: message,
        roomId: room.roomId,
      })
      .then((res) =>
        res.failure
          ? handleError(res)
          : setMessages((prev) => [
              ...prev,
              {
                name: user.username,
                userId: user.userId,
                message: message,
                roomId: room.roomId,
              },
            ])
      );
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("MSG-RECEIVE", (newMsg) => {
        console.log(newMsg)
        if(newMsg.userId !== user.userId) setMessages((prev) => [...prev, newMsg]);
      });
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <MainContainer>
      <Messages>
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.userId === user.userId ? "sended" : "received"
                }`}
              >
                <div className="content">
                  {message.userId !== user.userId && <h3>{message.name}</h3>}
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Messages>
      <ChatInput handler={handleSendMessage}/>
    </MainContainer>
  );
};

export default ChatCointainer;
