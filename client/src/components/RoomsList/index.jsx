import React from "react";
import { Header, RoomsContainer, List, Foot } from "./styles";
import addIcon from "../../assets/images/add.png";
import { Button } from "../../GlobalStyles";
import { useNavigate } from "react-router-dom";

const RoomsList = ({ rooms, join, currentRoom, setter, callback }) => {
  let navigate = useNavigate();

  return (
    <RoomsContainer>
      <Header>
        <h2>{join ? "Available rooms" : "Rooms"}</h2>
        {!join && <img src={addIcon} alt="add icon" onClick={() => navigate("/rooms")}/>}
      </Header>
      <List>
        {rooms.length === 0 ? (
          join ? <h2>No rooms available</h2> : <h2>Join or create a room!</h2>
        ) : (
          rooms.map((room, index) => {
            return (
              <div
                key={index}
                className={`room ${
                  currentRoom ? (room.roomId === currentRoom.roomId ? "selected" : "") : ""
                }`}
                onClick={() => setter(room)}
              >
                <h3>{room.name}</h3>
              </div>
            );
          })
        )}
      </List>
      <Foot>
        {join && currentRoom && <Button style={{ "margin": "0px"}} onClick={callback}>Join</Button>}
      </Foot>
    </RoomsContainer>
  );
};

RoomsList.defaultProps = {
  join: false,
  currentRoom: null,
  rooms: []
};

export default RoomsList;
