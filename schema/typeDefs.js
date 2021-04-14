const {gql} = require('apollo-server-express')

const typeDefs = gql`

	#USER AND AUTH typeDefs-----------------------------------

	type User{
		id_user : Int
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
	type Auth{
		idUser: Int!
		userName: String!
		userDoc: String!
		userPhone: String!
		userMail: String!
		userAddress: String
		password: String!
		registryDatetime: String
		picture: String
		rh: String
	}
	type JWT{
		access_token: String!
		token_type: String!
		expires_in: Int!
		scope: String!
	}
	input registerInput{
		userName: String!
		userDoc: String!
		userPhone: String!
		userMail: String!
		password: String!
		registryDatetime: String
		picture: String
		rh: String
		userAddress: String
	}
	input loginInput{
		usermail: String!
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

	#REQUEST typeDefs--------------------------------------
	
	type Request{
		request_id: Int!
		user_id: String!
		service_id: Int
		date: String!
		time: String!
		active: String!
		registry_request: String!
	}
	input requestInput{
		user_id: String!
		service_id: Int
		date: String!
		time: String!
		active: String!
		registry_request: String!
	}
	#COORDINATES_REQUEST typeDefs-------------------------
	
	type Coordinates{
		coordinates_id:Int!
		request: Int!
		lat: String!
		lng: String!
		address: String!
		type: Int!
	}
	input coordinatesInput{
		request: Int!
		lat: String!
		lng: String!
		address: String!
		type: Int!
	}

	#MULTIMEDIAS_REQUEST typeDefs-------------------------

	type Multimedias{
		id: Int!
		name: String!
		extension: String!
		size: Float!
		location: String!
	}

	input multimediasInput{
		name: String!
		extension: String!
		size: Float!
		location: String!
	}


	#QUERIES----------------------------------------------

	type Query{
		userById(user_id: String!): User!		

		chatByUser(user_id: String!): [Chat]
		chatById(user_id: String!, chat_id: String!): Chat

		getVehicle(id: Int!): [Vehicle]!
		getVehicles: [Vehicle]!

		getRequestbyUser(user_id: String!): [Request]!
		getRequestActive(active: String!): [Request]!
		getRequestbyService(service_id: Int!): [Request]!
		getRequest(request_id: Int): Request!
		getRequests: [Request]!
		
		getCoordinates: [Coordinates]!

		getMultimedias: [Multimedias]!
		getMultimedia(id: Int!): Multimedias!

	}

	#MUTATIONS-------------------------------------------

	type Mutation{
		loginUser(usermail: String!, password: String!): JWT
    	registerUser(user: registerInput!): Auth!
    	updateUser(user: registerInput!): User! 	

    	createChat(chat: chatInput!): Chat!
		sendMessage(msg: messageInput!): Message!	
		
		createVehicle(vehicle: vehicleInput!): Vehicle!
		updateVehicle(id: Int!, vehicle: vehicleInput!): Vehicle!
		deleteVehicle(id: Int!): Vehicle

		createRequest(request: requestInput!): Request!
		updateRequest(request_id: Int!, request: requestInput!): Request!
		deleteRequest(request_id: Int!): Request
		createCoordinates(coordinate: coordinatesInput!): Coordinates!
		updateCoordinates(coordinates_id: Int!, coordinate: coordinatesInput!): Coordinates!

		deleteMultimedia(id: Int!): Multimedias
		
	}

	`;

module.exports = {typeDefs};