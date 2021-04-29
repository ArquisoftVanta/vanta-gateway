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
		registry_datetime: String!
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
	input infoInput{
		rh: String!
		picture: String!
		user_address: String!
		user_doc: String!
		user_mail: String!
		user_name: String!
		user_phone: String!
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
		vehicle_type:	String!
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
		vehicle_type:	String!
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
		request: Int
		lat: String!
		lng: String!
		address: String!
		type: String!
		order: Int
	}
	input coordinatesInput{
		request: Int
		lat: String!
		lng: String!
		address: String!
		type: String!
		order: Int
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

	#SERVICES typeDefs-------------------------

	type Service{
		service_id: Int!
		user_id: Int!
		date_: String!
		state_service: Boolean!
		vehicle_id: Int!
		valor: Float!
		cupos: Int!
	}

	type CoordinatesServ{
        coordinates_id:Int!
        service_id: Int!
        lat: String!
        lng: String!
        address: String!
        type: String!
    }

	input coordinatesServInput{
        service_id: Int
        lat: String!
        lng: String!
        address: String!
        type: String!
    }

	input serviceInput{
		userid: Int!
		date_: String!
		state_service: Boolean!
		vehicle_id: Int!
		valor: Float!
		cupos: Int!
	}

	input serviceInputFull{
		service_id: Int!
		userid: Int!
		date_: String!
		state_service: Boolean!
		vehicle_id: Int!
		valor: Float!
		cupos: Int!
	}

	#NOTIFICATIONS typeDefs-------------------------

	type Created_At{
		_seconds: Int!
		_nanoseconds: Int!
	}

	type Notification{
		direction: String!
		message: String!
		user_email: String!
		created_at: String!
		notification_id: Created_At!
		viewed: Boolean!
	}

	input notificationInput{
		direction: String!
		message: String!
		user_email: String!
		viewed: Boolean!
	}


	#QUERIES----------------------------------------------

	type Query{
		userById(user_id: String!): User!		

		chatByUser(user_id: String!): [Chat]
		chatById(user_id: String!, chat_id: String!): Chat

		getVehicle(owner: String!): [Vehicle]!
		getVehicles: [Vehicle]!

		getRequestbyUser(user_id: String!): [Request]!
		getRequestActive(active: String!): [Request]!
		getRequestbyService(service_id: Int!): [Request]!
		getRequest(request_id: Int): Request!
		getRequests: [Request]!

		getService(service_id: Int!): Service!
		getServices: [Service]! 
		
		getCoordinates: [Coordinates]!

		getMultimedias: [Multimedias]!
		getMultimedia(id: Int!): Multimedias!

		getNotifications(user_email: String!): [Notification]!

	}

	#MUTATIONS-------------------------------------------

	type Mutation{
		loginUser(usermail: String!, password: String!): JWT
    	registerUser(user: registerInput!): Auth!
    	updateUser(user_mail: String!, user: infoInput!): User! 	

    	createChat(chat: chatInput!): Chat!
		sendMessage(msg: messageInput!): Message!	
		
		createVehicle(vehicle: vehicleInput!): Vehicle!
		updateVehicle(id: Int!, vehicle: vehicleInput!): Vehicle!
		deleteVehicle(id: Int!): Vehicle

		createRequest(request: requestInput!): Request!
		updateRequest(request_id: Int!, request: requestInput!): Request!
		deleteRequest(request_id: Int!): Request

		createService(service: serviceInput!): Service!
		updateService(service: serviceInputFull!): Service!
		deleteService(id: Int!): Service

		createServCoordinates(coordinate: coordinatesServInput!): CoordinatesServ!

		createCoordinates(coordinate: coordinatesInput!): Coordinates!
		updateCoordinates(coordinates_id: Int!, coordinate: coordinatesInput!): Coordinates!

		deleteMultimedia(id: Int!): Multimedias

		createNotification(notification: notificationInput!): Notification!
		updateNotification(notification_id: String!): Notification
		deleteNotification(notification_id: String!): Notification

		newVehicle(vehicle: vehicleInput!): Vehicle!
		newRequest(req: requestInput!, coor1: coordinatesInput!, coor2: coordinatesInput!): Request!
		
	}

	`;

module.exports = {typeDefs};