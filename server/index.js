const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const socket = require("socket.io");
const AuthRoutes = require("./src/routes/auth.routes");
const UserRoutes = require("./src/routes/user.routes");
const PORT = process.env.PORT || 8080;
const Room = require('./src/models/room.model');
const { addUser, getUser, removeUser } = require('./utils');
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

//   db.collection('users').find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// }); 

const server = app.listen(PORT, () => {
  console.log(`${process.env.NAME} started on ${process.env.PORT}`)
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(socket.id);
  Room.find().then(result => {
    socket.emit('output-rooms', result)
  })
  
  socket.on('create-room', name => {
      const room = new Room({ name });
      room.save().then(result => {
          io.emit('room-created', result)
      })
  })

  socket.on('join', ({ name, roomId, userId }) => {
      const { error, user } = addUser({
          socketId: socket.id,
          name,
          roomId,
          userId
      })
      socket.join(roomId);
      if (error) {
          console.log('join error', error)
      } else {
          console.log('join user', user)
      }
  })

  socket.on('sendMessage', (message, roomId, callback) => {
      const user = getUser(socket.id);
      const newMessage = {
          name: user.name,
          userId: user.userId,
          roomId,
          text: message
      }
      console.log('message', newMessage)
      const msg = new Message(newMessage);
      msg.save().then(result => {
          io.to(roomId).emit('message', result);
          callback()
      })

  })

  socket.on('get-messages-history', roomId => {
      Message.find({ roomId }).then(result => {
          socket.emit('output-messages', result)
      })
  })

  socket.on('disconnect', () => {
      removeUser(socket.id);
  })
});