import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/UserContext";
import { Page, PageContainer } from "../../GlobalStyles";
import {
  ChatContainer,
  MainContainer,
  Messages,
  WelcomeContainer,
} from "./styles";
import Welcome from "../../assets/images/hello.gif";
import { messageService, roomService } from "../../services";
import { handleError } from "../../handlers/ErrorHandler";
import { io } from "socket.io-client";
import { HOST } from "../../assets/constants";
import RoomsList from "../../components/RoomsList";
import ChatInput from "../../components/ChatInput";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  const { login, user } = useAuth();
  const [currentRoom, setCurrentRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const currUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const socket = useRef();
  let navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    if (currentRoom) {
      socket.current.emit(
        "USER-CONNECT",
        user.username,
        user.userId,
        currentRoom.roomId
      );
      messageService
        .getMessagesFromRoom(currentRoom.roomId)
        .then((res) =>
          res.failure ? handleError(res.status) : setMessages(res.data.messages)
        );
    }
  }, [currentRoom]);

  const handleSendMessage = (message, setMessage) => {
    socket.current.emit("MSG-SEND", message, currentRoom.roomId, () =>
      setMessage("")
    );
    messageService
      .sendMessage({
        from: {
          name: user.username,
          userId: user.userId,
        },
        text: message,
        roomId: currentRoom.roomId,
      })
      .then((res) => {
        if (res.failure) {
          handleError(res);
        } else {
          const newMessages = [...messages];
          newMessages.push({
            name: user.username,
            userId: user.userId,
            message: message,
            roomId: currentRoom.roomId,
          });
          setMessages(newMessages);
        }
      });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (currUser && currUser !== "") {
      let newUser = {
        accessToken: token,
        user: JSON.parse(currUser),
      };
      login(newUser);
    } else {
      navigate("/login");
    }
    socket.current = io(HOST);
    socket.current.on("MSG-RECEIVE", (newMsg) => {
      if (newMsg.userId !== user.userId)
        setMessages((prev) => [...prev, newMsg]);
    });
  }, []);

  useEffect(() => {
    if (user) {
      roomService.getRoomsFromUser(user.userId).then((res) => {
        res.failure
          ? handleError(res.status, navigate)
          : setRooms(res.data.rooms);
      });
    }
  }, [user]);

  return (
    <Page>
      <Navbar isAuth={true} />
      <PageContainer>
        <ChatContainer>
          <RoomsList
            rooms={rooms}
            currentRoom={currentRoom}
            callback={setCurrentRoom}
          />
          {user &&
            (currentRoom ? (
              <MainContainer>
                <Messages>
                  {messages.map((message) => {
                    return (
                      <div ref={scrollRef} key={uuidv4()}>
                        <div
                          className={`message ${
                            message.userId === user.userId
                              ? "sended"
                              : "received"
                          }`}
                        >
                          <div className="content">
                            {message.userId !== user.userId && (
                              <h3>{message.name}</h3>
                            )}
                            <p>{message.message}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Messages>
                <ChatInput handler={handleSendMessage} />
              </MainContainer>
            ) : (
              <WelcomeContainer>
                <img src={Welcome} alt="welcome gif" />
                <h2>Welcome {user.username}!</h2>
              </WelcomeContainer>
            ))}
        </ChatContainer>
      </PageContainer>
    </Page>
  );
};

export default Chat;
