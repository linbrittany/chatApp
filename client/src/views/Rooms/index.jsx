import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  const [currentRoom, setCurrentRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
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

  const handleJoin = () => {
    roomService
      .addUserToRoom({
        roomId: currentRoom.roomId,
        userId: user.userId,
      })
      .then((res) => {
        res.failure ? handleError(res.status) : navigate("/");
      });
  };

  const onSubmit = (data) => {
    console.log("hola")
  }
 
  return (
    <Page>
      <Navbar isAuth={true} />
      <PageContainer>
        <MainContainer>
          <RoomsList
            rooms={rooms}
            join={true}
            setter={setCurrentRoom}
            callback={handleJoin}
          />
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <h2>Create Room</h2>
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
            <Button type="submit">Create</Button>
          </FormContainer>
        </MainContainer>
      </PageContainer>
    </Page>
  );
};

export default Rooms;
