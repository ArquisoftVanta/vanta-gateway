const {ApolloServer} = require('apollo-server-express')
const {typeDefs} = require('./schema/typeDefs')
const {resolvers} = require('./schema/resolvers')

const express = require('express')
const app = express()
const port = process.env.PORT || 8000;

const server = new ApolloServer({typeDefs, resolvers});
server.applyMiddleware({app});


app.listen(port, () =>{
	console.log("App started on port  " + port)
})


