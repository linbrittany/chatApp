import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/UserContext";
import { Page, PageContainer } from "../../GlobalStyles";
import {
  ChatContainer,
  Foot,
  Header,
  MainContainer,
  UsersContainer,
  UsersList,
  WelcomeContainer,
} from "./styles";
import ChatInput from "../../components/ChatInput/index";
import Messages from "../../components/Messages";
import { io } from "socket.io-client";
import { HOST } from "../../assets/constants";
import Welcome from "../../assets/images/hello.gif";

const Chat = () => {
  const { login, user } = useAuth();
  const [currentChat, setCurrentChat] = useState(null);
  const [users, setUsers] = useState([]);
  const currUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  const socket = useRef();

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
      socket.current = io(HOST);
      socket.current.emit("addUser", user.username, user.userId);
      socket.current.emit("getUsers", user.userId);
      socket.current.on("outputUsers", (users) => {
        setUsers(users);
      });
    }
  }, [user]);

  const changeCurrentChat = (index, room) => {
    setCurrentChat(index);
  };

  return (
    <Page>
      <Navbar isAuth={true}/>
      <PageContainer>
        <ChatContainer>
          <UsersContainer>
            <Header>
              <h2>Users Online</h2>
            </Header>
            <UsersList>
              {users.map((user) => {
                return (
                  <div
                    key={user.userId}
                    className={`user ${
                      user.userId === currentChat ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(user.userId)}
                  >
                    <h3>{user.name}</h3>
                  </div>
                );
              })}
            </UsersList>
            <Foot>{user && <h2>{user.username}</h2>}</Foot>
          </UsersContainer>
          {user && (currentChat ? <MainContainer>
            <Messages />
            <ChatInput />
          </MainContainer> :
          <WelcomeContainer>
            <img src={Welcome} alt="welcome gif"/>
            <h2>Welcome {user.username}!</h2>
          </WelcomeContainer>)}
        </ChatContainer>
      </PageContainer>
    </Page>
  );
};

export default Chat;
