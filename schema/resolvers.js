const { url, auth, perfil, chat, vehicles, request } = require('./servers');
const axios = require('axios');
const { getVariableValues } = require('graphql/execution/values');
const URLVehicles = `http://${url}:${vehicles}/vehicles`;

const URLAuth = `http://${url}:${auth}`;
let config = {headers: {'Authorization': 'Basic dmFudGE6ZHJhZ29uZmx5LXNvZnR3YXJl',
						'Content-Type': 'application/json'}}

const URLPerfil = `http://${url}:${perfil}`;
const URLChat = `http://${url}:${chat}/conv`;
const URLRequest = `http://${url}:${request}`;
const URLCoordinates = `http://${url}:${request}/coordinates`;

//TODO: Añadir JWT?????
const resolvers = {
	Query: {
		//TODO: Añadir la imagen antes de devolver resultado?????
		userById: async(id)=>{
			const result = await axios.get(`${URLPerfil}/${id}`)
			.then(res => res.data);
			return result;
		},



		chatByUser: async (_, {user_id}) => {
			const result = await axios.get(`${URLChat}/${user_id}`)
			.then(res => res.data);
			return result;
		},

		chatById: async(_, {user_id, chat_id}) => {
			const result = await axios.get(`${URLChat}/${user_id}/${chat_id}`)
			.then(res => res.data);
			return result;
		},

		getVehicle: async(_, {owner}) => {
			const result = await axios.get(`${URLVehicles}/${owner}`)
			.then(res => res.data.data);
			return result;
		},

		getVehicles: async(_) => {
			const result = await axios.get(`${URLVehicles}/`)
			.then(res => res.data.data);
			console.log(result);
			return result;
		},

		getRequestbyUser: async(_, {user_id}) => {
			const result = await axios.get(`${URLRequest}/requestUser/?user=${user_id}`)
			.then(res => res.data.data);
			return result;
		},

		getRequestActive: async(_, {active}) => {
			const result = await axios.get(`${URLRequest}/requestActive/?active=${active}`)
			.then(res => res.data.data);
			return result;
		},

		getRequestbyService: async(_, {service_id}) => {
			const result = await axios.get(`${URLRequest}/requestService/?service=${service_id}`)
			.then(res => res.data.data);
			return result;
		},

		getRequest: async(_) => {
			const result = await axios.get(`${URLRequest}/request`)
			.then(res => res.data.data);
			console.log(result);
			return result;
		},


	},
	Mutation: {
		loginUser: async (credentials) => {
			// auth: {username: "vanta" , password: "dragonfly-software"}
			const result = await axios.post(`${URLAuth}/oauth/token`, credentials, config)
			.then(res => res.data);
			return result;
		},
		registerUser: async (user) => {
			const result = await axios.post(`${URLAuth}/api/user/signup`, user, config)
			.then(res => res.data);
			return result;
		},
		updateUser: async (user) => {
			const result = await axios.put(`${URLPerfil}/api/user/signup`, user, config)
			.then(res => res.data);
			return result;
		},




		createChat: async (_, {chat}) => {
			console.log({chat})
			const result = await axios.post(`${URLChat}`, chat)
			.then(res => res.data);

			return result;
		},

		sendMessage: async (_, {msg}) => {
			console.log({msg})
			const result = await axios.put(`${URLChat}`, msg) 
			.then(res => res.data)

			return result;
		},

		createVehicle: async (_, {vehicle}) => {
			const result = await axios.post(`${URLVehicles}`, vehicle) 
			.then(res => res.data.data);
			return result;
		},
		updateVehicle: async(_, {id, vehicle}) => {
			const result = await axios.put(`${URLVehicles}/${id}`, vehicle)
			.then(res => res.data.data);
			console.log(result);
			return result;
		},
		deleteVehicle: async(_, {id}) => {
			const result = await axios.delete(`${URLVehicles}/${id}`)
			.then(res => res.data.data);
			console.log(result);
			return result;
		},
		createRequest: async (_, {request}) => {
			const result = await axios.post(`${URLRequest}/request/`, request) 
			.then(res => res.data.data);
			return result;
		},
		updateRequest: async(_, {request_id, request}) => {
			const result = await axios.put(`${URLRequest}/request/${request_id}`, request)
			.then(res => res.data.data);
			console.log(result);
			return result;
		},
		deleteRequest: async(_, {request_id}) => {
			const result = await axios.delete(`${URLRequest}/request/${request_id}`)
			.then(res => res.data.data);
			console.log(result);
			return result;
		},
		createCoordinates: async (_, {coordinate}) => {
			const result = await axios.post(`${URLCoordinates}`, coordinate) 
			.then(res => res.data.data);
			return result;
		},
		updateCoordinates: async(_, {coordinates_id, coordinate}) => {
			const result = await axios.put(`${URLCoordinates}/${coordinates_id}`, request)
			.then(res => res.data.data);
			console.log(result);
			return result;
		},
		

		
	}
};

module.exports = {resolvers};
