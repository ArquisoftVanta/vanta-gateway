import {graphiqlExpress, graphqlExpress} from 'apollo-server-express'

const express = require('express')
const app = express()

const port = process.env.PORT || 8000;

app.listen(port, () =>{
	console.log("App started on port  " + port)
})