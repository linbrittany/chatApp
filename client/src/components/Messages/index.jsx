import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { MainContainer } from "./styles";
import { messageService } from "../../services";
import { handleError } from "../../handlers/ErrorHandler";
import { useNavigate } from "react-router-dom";

const Messages = ({ room, socket, user }) => {
  // const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  let navigate = useNavigate();

  const messages = [
    { userId: "62eac45acf2b9cb98552a02e", name: "user 1", message: "hola" },
    { userId: "62eac45acf2b9cb98552a02e", name: "user 1", message: "Como estas?" },
    { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
    { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
    { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
    { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
    { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
    { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
    { userId: "62eac45acf2b9cb98552", name: "user 2", message: "todo bien vos?" },
    { userId: "62eac45acf2b9cb98552a02e", name: "user 1", message: "holaholaholaholaholaholaholaholaholaholaholaholaholaholaholaholaholaholahola" },
  ];

  useEffect(() => {
    socket.current.emit("USER-CONNECT", room.name, user.userId, room.roomId);
  }, [room]);

  // useEffect(() => {
  //   messageService.getMessagesFromUsers({
  //     from: receiver,
  //     to: user.userId
  //   }).then(res => {
  //     console.log(res);
  //     res.failure ? handleError(res.status, navigate) : setMessages(res.data);
  //   })
  // }, [receiver]);

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

  // const handleSendMsg = async (msg) => {
  //   const data = await JSON.parse(
  //     localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //   );
  //   socket.current.emit("send-msg", {
  //     to: currentRoom._id,
  //     from: data._id,
  //     msg,
  //   });
  //   await axios.post(sendMessageRoute, {
  //     from: data._id,
  //     to: currentRoom._id,
  //     message: msg,
  //   });

  //   const msgs = [...messages];
  //   msgs.push({ fromSelf: true, message: msg });
  //   setMessages(msgs);
  // };

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-recieve", (msg) => {
  //       setArrivalMessage({ fromSelf: false, message: msg });
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <MainContainer>
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
    </MainContainer>
  );
};

export default Messages;
