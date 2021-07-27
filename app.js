const {ApolloServer} = require('apollo-server-express')
const {typeDefs} = require('./schema/typeDefs')
const {resolvers} = require('./schema/resolvers')
const { gateway} = require('./schema/servers');

const io = require("socket.io");
const express = require('express');
const http = require("http");
const cors = require("cors");

const socketConnection = require("./sockets/sockets");
const socketFunctionality = require("./sockets/socketFuncs.js");

let app = express();
let port = process.env.PORT || gateway;


app.use(cors());
//Connecting Apollo Server
const apolloServer = new ApolloServer({typeDefs, resolvers});
apolloServer.applyMiddleware({app});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const server = app.listen(port, () =>{
	console.log("App started on port  " + port)
})

let socket = io(server, { cors: { origin: "*" } });

//Connecting Socket Server
socket.use(socketConnection);
socket.on("connection", socketFunctionality);



