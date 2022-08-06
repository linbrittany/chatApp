import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/UserContext";
import { Page, PageContainer } from "../../GlobalStyles";
import {
  ChatContainer,
  MainContainer,
  WelcomeContainer,
} from "./styles";
import ChatInput from "../../components/ChatInput/index";
import Messages from "../../components/Messages";
import Welcome from "../../assets/images/hello.gif";
import { roomService } from "../../services";
import { handleError } from "../../handlers/ErrorHandler";
import { io } from "socket.io-client";
import { HOST } from "../../assets/constants";
import RoomsList from "../../components/RoomsList";

const Chat = () => {
  const { login, user } = useAuth();
  const [currentRoom, setCurrentRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const currUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const socket = useRef();
  let navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    if (user) {
      roomService.getRoomsFromUser(user.userId).then((res) => {
        res.failure
          ? handleError(res.status, navigate)
          : setRooms(res.data.rooms);
      });
      socket.current = io(HOST);
    }
  }, [user]);

  // const changeCurrentRoom = (room) => {
  //   setCurrentRoom(room);
  // };

  return (
    <Page>
      <Navbar isAuth={true} />
      <PageContainer>
        <ChatContainer>
          <RoomsList rooms={rooms} currentRoom={currentRoom} setter={setCurrentRoom}/>
          {user &&
            (currentRoom ? (
              <MainContainer>
                <Messages room={currentRoom} socket={socket} user={user} />
                <ChatInput />
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
