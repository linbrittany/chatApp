const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const socket = require("socket.io");
const AuthRoutes = require("./src/routes/auth.routes");
const UserRoutes = require("./src/routes/user.routes");
const PORT = process.env.PORT || 8080;
const { addUser, getUser, removeUser, getAllUsers } = require('./utils');
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

//   db.collection('messages').find({}).toArray(function(err, result) {
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

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("connect", (name, userId) => {
    const { error, user } = addUser({
      socketId: socket.id,
      name,
      userId
    })

    if (error) {
        console.log('error connecting user', error)
    } else {
        console.log('user connected', user)
    }
  });

  socket.on("getUsers", () => {
    const activeUsers = getAllUsers();
    socket.emit("activeUsers", activeUsers);
  });

  socket.on("sendMessage", (socketId) => {
    const sendUserSocket = getUser(socketId);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("received", data.msg);
    }
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
  })

});
