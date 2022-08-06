import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { MainContainer } from "./styles";
import { messageService } from "../../services";
import { handleError } from "../../handlers/ErrorHandler";
import { useNavigate } from "react-router-dom";

const Messages = ({ receiver, socket, user }) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    messageService.getMessagesFromUsers({
      from: receiver,
      to: user.userId
    }).then(res => {
      console.log(res);
      res.failure ? handleError(res.status, navigate) : setMessages(res.data);
    })
  }, [receiver]);

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
              className={`message ${message.from === user._id ? "sended" : "received"}`}
            >
              <div className="content ">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        );
      })}
    </MainContainer>
  );
}

export default Messages