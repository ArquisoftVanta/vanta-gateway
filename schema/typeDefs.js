const {gql} = require('apollo-server-express')

const typeDefs = gql`

	#USER AND AUTH typeDefs

	type User{
		user_id : Int!
		name: String!
		doc: String!
		phone: String!
		mail: String!
		address: String!
		registerDate: String!
		password: String!
	}
	input registerInput{
		userName: String!
		userDoc: String!
		userPhone: String!
		userMail: String!
		password: String!
	}
	input loginInput{
		username: String!
		password: String!
	}


	#CHAT typeDefs

	type Message{
		_id: String
		sender: String
		content: String
		createdAt: String
		updatedAt: String
	}
	type Chat{
		_id: String
		user1: String
		user2: String
		active: Boolean
		conversation: [Message]
		createdAt: String
		updatedAt: String
	}
	input chatInput{
		user1: String!
		user2: String! 
	}
	input messageInput{
		convId: String!
		userId: String!
		content: String!
	}


	type Query{
		userById(user_id: String!): User!		

		chatByUser(user_id: String!): [Chat]
		chatById(user_id: String!, chat_id: String!): Chat
	}

	type Mutation{
		loginUser(credentials: loginInput!): String!
    	registerUser(user: registerInput!): User!
    	updateUser(user: registerInput!): User! 	

    	createChat(chat: chatInput!): Chat!
		sendMessage(msg: messageInput!): Message!	
	}

	`;

module.exports = {typeDefs};