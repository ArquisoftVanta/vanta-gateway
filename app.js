const {ApolloServer} = require('apollo-server-express')
const {typeDefs} = require('./schema/typeDefs')
const {resolvers} = require('./schema/resolvers')
const { gateway} = require('./servers');

const express = require('express')
const app = express()
const port = process.env.PORT || gateway;

const server = new ApolloServer({typeDefs, resolvers});
server.applyMiddleware({app});


app.listen(port, () =>{
	console.log("App started on port  " + port)
})


