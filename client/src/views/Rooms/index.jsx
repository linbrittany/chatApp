import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../../assets/constants";
import Navbar from "../../components/Navbar";
import RoomsList from "../../components/RoomsList";
import { useAuth } from "../../contexts/UserContext";
import { Page, PageContainer } from "../../GlobalStyles";
import { handleError } from "../../handlers/ErrorHandler";
import { roomService } from "../../services";
import { Button, Error, FormContainer, Input, Label, MainContainer } from "./styles";

const Rooms = () => {
  const { register, formState: {errors}, handleSubmit} = useForm();
  const { login, user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [error, setError] = useState(false);
  const currUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      roomService.getRoomsAvailable(user.userId).then((res) => {
        res.failure ? handleError(res.status) : setRooms(res.data.rooms);
      });
    }
  }, [user]);

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

  const handleJoin = (currentRoom) => {
    roomService
      .addUserToRoom({
        roomId: currentRoom.roomId,
        userId: user.userId,
      })
      .then((res) => {
        res.failure ? handleError(res) : navigate('/');
      });
  };

  const onSubmit = (data) => {
    setError(false);
    roomService.createRoom({
      name: data.roomName,
      userId: user.userId
    }).then(res => {
      if (res.failure) {
        res.status === STATUS.SERVER_ERROR ? setError(true) : handleError(res);
      } else {
        navigate('/');
      }
    });
  }
 
  return (
    <Page>
      <Navbar isAuth={true} />
      <PageContainer>
        <MainContainer>
          <RoomsList
            rooms={rooms}
            join={true}
            currentRoom={currentRoom}
            callback={setCurrentRoom}
            handleJoin={handleJoin}
          />
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <h2>Create Room</h2>
            {error && <Error>This name has already been taken</Error>}
            <Label>Enter room name:</Label>
            <Input type="text" {...register(
                          "roomName",
                          {
                            required: {
                              value: true,
                              message: "This field is required"
                            }
                          })
                      }/>
            {errors.roomName && <Error>{errors.roomName.message}</Error>}
            <Button>Create</Button>
          </FormContainer>
        </MainContainer>
      </PageContainer>
    </Page>
  );
};

export default Rooms;
