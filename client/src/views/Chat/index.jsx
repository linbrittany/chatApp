import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import { useAuth } from '../../contexts/UserContext';
import { Page, PageContainer } from '../../GlobalStyles'
import { ChatContainer, Foot, Header, MainContainer, RoomsContainer, RoomsList } from './styles';
import addIcon from "../../assets/images/add.png";
import ChatInput from '../../components/ChatInput/index';
import Messages from '../../components/Messages';

const Chat = () => {
  const { login, user } = useAuth();
  const [currentRoom, setCurrentRoom] = useState(null);
  const currUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  let navigate = useNavigate();

  const rooms = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6"]

  useEffect(() => {
    if (currUser && currUser !== "") {
        let newUser = {
            accessToken: token,
            user: JSON.parse(currUser)
        }
        login(newUser)
    } else {
        navigate('/login')
    }
  }, [])

  const changeCurrentRoom = (index, room) => {
    setCurrentRoom(index);
  };

  return (
    <Page>
      <Navbar/>
      <PageContainer>
        <ChatContainer>
          <RoomsContainer>
              <Header>
                <h2>Rooms</h2>
                <img src={addIcon} alt="add icon"/>
              </Header>
              <RoomsList>
                  {rooms.map((room, index) => {
                    return (
                      <div
                        key={index}
                        className={`room ${
                          index === currentRoom ? "selected" : ""
                        }`}
                        onClick={() => changeCurrentRoom(index, room)}
                      >
                        <h3>{room}</h3>
                      </div>
                    );
                  })}
              </RoomsList>
              <Foot>
                {user && <h2>{user.username}</h2>}
              </Foot>
          </RoomsContainer>
          <MainContainer>
            <Messages/>
            <ChatInput/>
          </MainContainer>
        </ChatContainer>
      </PageContainer>
    </Page>
  )
}

export default Chat