const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const socket = require("socket.io");
const AuthRoutes = require("./src/routes/auth.routes");
const UserRoutes = require("./src/routes/user.routes");
const MessageRoutes = require("./src/routes/message.routes");
const PORT = process.env.PORT || 8080;
const { addUser, getUser, removeUser } = require("./utils");
const RoomRoutes = require("./src/routes/room.routes");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/v1/auth/", new AuthRoutes().router);
app.use("/v1/users/", new UserRoutes().router);
app.use("/v1/messages/", new MessageRoutes().router);
app.use("/v1/rooms/", new RoomRoutes().router);

// const MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, client) {
//   if (err) throw err;

//   var db = client.db('chat');

//   db.listCollections().toArray(function(err, names) {
//     if(!err) {
//         console.log(names)
//     }
//   });

//   db.collection('messages').find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

const server = app.listen(PORT, () => {
  console.log(`${process.env.NAME} started on ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("USER-CONNECT", (name, userId, roomId) => {
    const { error, user } = addUser({
      socketId: socket.id,
      name,
      userId,
      roomId
    });

    if (error) {
      console.log("error connecting user", error);
    } else {
      console.log("user connected", user);
    }
  });

  socket.on("MSG-SEND", (message, roomId, callback) => {
    const user = getUser(socket.id);
    io.to(roomId).emit('MSG-RECEIVE', {
      name: user.name,
      roomId: roomId,
      message: message
    });
    callback();
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});
