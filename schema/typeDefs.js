const {gql} = require('apollo-server-express')

const typeDefs = gql`

	#USER AND AUTH typeDefs-----------------------------------

	type User{
		id_user : Int!
		rh: String!
		password: String!
		picture: String!
		user_address: String!
		user_doc: String!
		user_mail: String!
		user_name: String!
		user_phone: String!
		register_date: String!
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


	#CHAT typeDefs------------------------------------------

	type Message{
		_id: String!
		sender: String!
		content: String!
		createdAt: String!
		updatedAt: String!
	}
	type Chat{
		_id: String!
		user1: String!
		user2: String!
		active: Boolean!
		conversation: [Message]!
		createdAt: String!
		updatedAt: String!
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


	#VEHICLE typeDefs--------------------------------------

	type Vehicle{
		id:	Int!
		owner:	String!
		license_plate:	String!
		vehicle_type:	Int!
		model:	String!
		year:	Int!
		color:	String!
		registry:	String!
		picture:	String!
		capacity:	Int!
		brand:	String!
		service_type:	String!
		body:	String!
		soat_exp:	String!
		engine:	Int!
		gas_type:	String!
	}
	input vehicleInput{
		owner:	String!
		license_plate:	String!
		vehicle_type:	Int!
		model:	String!
		year:	Int!
		color:	String!
		registry:	String!
		picture:	String
		capacity:	Int!
		brand:	String!
		service_type:	String!
		body:	String!
		soat_exp:	String!
		engine:	Int!
		gas_type:	String!	
	}


	#QUERIES----------------------------------------------

	type Query{
		userById(user_id: String!): User!		

		chatByUser(user_id: String!): [Chat]
		chatById(user_id: String!, chat_id: String!): Chat

		getVehicle(owner: String!): [Vehicle]!
		getVehicles: [Vehicle]!

	}

	#MUTATIONS-------------------------------------------

	type Mutation{
		loginUser(credentials: loginInput!): String!
    	registerUser(user: registerInput!): User!
    	updateUser(user: registerInput!): User! 	

    	createChat(chat: chatInput!): Chat!
		sendMessage(msg: messageInput!): Message!	
		
		createVehicle(vehicle: vehicleInput!): Vehicle!
		updateVehicle(id: Int!, vehicle: vehicleInput!): Vehicle!
		deleteVehicle(id: Int!): Vehicle
	}

	`;

module.exports = {typeDefs};