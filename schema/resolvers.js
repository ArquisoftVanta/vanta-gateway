const { url, auth, perfil, chat, vehicles, request, viajes, multimedia } = require('./servers');
const axios = require('axios');
const { getVariableValues } = require('graphql/execution/values');
const URLVehicles = `http://${url}:${vehicles}/vehicles`;

const URLAuth = `http://${url}:${auth}`;
let config = {headers: {'Content-Type': 'application/json'}, auth: { username: 'vanta', password: 'dragonfly-software'}}																	

const URLPerfil = `http://${url}:${perfil}`;
const URLChat = `http://${url}:${chat}/conv`;
const URLRequest = `http://${url}:${request}`;
const URLService = `http://${url}:${viajes}`;
const URLCoordinates = `http://${url}:${request}/coordinates`;
const URLMultimedia = `http://${url}:${multimedia}`;

const resolvers = {
	Query: {
		//USER Q ----------------------------------------------------------------------
		userById: async(_, {user_id})=>{
			const result = await axios.get(`${URLPerfil}/user/?user_mail=${user_id}`)
			.then(res => res.data);
			return result;
		},


		//CHAT Q ----------------------------------------------------------------------
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


		//VEHICLE Q ----------------------------------------------------------------------
		getVehicle: async(_, {id}) => {
			const result = await axios.get(`${URLVehicles}/${id}`)
			.then(res => res.data.data);
			return result;
		},
		getVehicles: async(_) => {
			const result = await axios.get(`${URLVehicles}/`)
			.then(res => res.data.data);
			return result;
		},


		//REQUEST Q ----------------------------------------------------------------------
		getRequestbyUser: async(_, {user_id}) => {
			const result = await axios.get(`${URLRequest}/requestUser/?user=${user_id}`)
			.then(res => res.data);
			return result;
		},
		getRequestActive: async(_, {active}) => {
			const result = await axios.get(`${URLRequest}/requestActive/?active=${active}`)
			.then(res => res.data);
			return result;
		},
		getRequestbyService: async(_, {service_id}) => {
			const result = await axios.get(`${URLRequest}/requestService/?service=${service_id}`)
			.then(res => res.data);
			return result;
		},
		getRequest: async (_, {request_id}) => {
			const result = await axios.get(`${URLRequest}/request/${request_id}`)
			.then(res => res.data);
			console.log(result);
			return result;
		},
		getRequests: async(_) => {
			const result = await axios.get(`${URLRequest}/request`)
			.then(res => res.data);
			return result;
		},
		getService: async(_, {service_id}) => {
			const result = await axios.get(`${URLService}/service/${service_id}`)
			.then(res => res.data);
			console.log(result);
			return result;
		},
		getServices: async(_) => {
			const result = await axios.get(`${URLService}/service`)
			.then(res => res.data);
			console.log(result);
			return result;
		}, 
		getCoordinates: async(_) => {
			const result = await axios.get(`${URLCoordinates}`)
			.then(res => res.data);
			console.log(result);
			return result;
		},


		//MULTIMEDIA Q ----------------------------------------------------------------------
		getMultimedias: async(_) => {
			const result = await axios.get(`${URLMultimedia}/multimedia`)
			.then(res => res.data);
			return result;
		},
		getMultimedia: async(_, {id}) => {
			const result = await axios.get(`${URLMultimedia}/multimedia/${id}`)
			.then(res => res.data);
			return result;
		}
	},
	Mutation: {
		//USER M ----------------------------------------------------------------------
		loginUser: async (_, {usermail, password}) => {
			
			const result = await axios.post(`${URLAuth}/oauth/token?username=${usermail}&password=${password}&grant_type=password`,"", config)
			.then(res => res.data);
			return result;
		},
		registerUser: async (_, user) => {
			const result = await axios.post(`${URLAuth}/api/user/signup`, JSON.stringify(user.user), config)
			.then(res => res.data);
			return result;
		},
		updateUser: async (user) => {
			const result = await axios.put(`${URLPerfil}/api/user/signup`, user, config)
			.then(res => res.data);
			return result;
		},



		//CHAT M ----------------------------------------------------------------------
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


		//VEHICLE M ----------------------------------------------------------------------
		createVehicle: async (_, {vehicle}) => {

/*			console.log(vehicle);
			var usrChecker = await resolvers.Query.userById({user_id: vehicle.owner})

			/*var imgChecker = true
			if(vehicle.picture != "" && vehicle.picture != null){
				imgChecker = await resolvers.Query.getMultimedia(vehicle.picture) 
			}

			if(usrChecker ){

			}else{
				return new Error('Username or Picture not valid')
			}*/

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


		//REQUEST M ----------------------------------------------------------------------
		createRequest: async (_, {request}) => {
			const result = await axios.post(`${URLRequest}/request/`, request) 
			.then(res => res.data);
			return result;
		},

		updateRequest: async(_, {request_id, request}) => {
			const result = await axios.put(`${URLRequest}/request/${request_id}`, request)
			.then(res => res.data);
			return result;
		},

		deleteRequest: async(_, {request_id}) => {
			const result = await axios.delete(`${URLRequest}/request/${request_id}`)
			.then(res => res.data);
			console.log(result);
			return result;
		},

		createCoordinates: async (_, {coordinate}) => {
			const result = await axios.post(`${URLCoordinates}/`, coordinate) 
			.then(res => res.data);
			return result;
		},

		updateCoordinates: async(_, {coordinates_id, coordinate}) => {
			const result = await axios.put(`${URLCoordinates}/${coordinates_id}`, coordinate)
			.then(res => res.data);
			console.log(result);
			return result;
		},

		createService: async (_, {service}) => {
			console.log(JSON.stringify(service));
			const result = await axios.post(`${URLService}/service`, JSON.stringify(service)) 
			.then(res => res.data);
			console.log(result);
			return result;
		},
		updateService: async (_, {service}) => {
			const result = await axios.put(`${URLService}/service`, JSON.stringify(service)) 
			.then(res => res.data);
			return result;
		},
		deleteService: async (_, {id}) => {
			const result = await axios.delete(`${URLService}/service/${id}`) 
			.then(res => res.data);
			return result;
		},


		//MULTIMEDIA M ----------------------------------------------------------------------
		deleteMultimedia: async(_, {id}) => {
			const result = await axios.delete(`${URLMultimedia}/multimedia/${id}`)
			.then(res => res.data);
			return result;
		},


		//-------------------------------------------------------------------------------------------------------
		//--------------------------------------RESOLVERS WITH MULTIPLE CALLS------------------------------------
		//-------------------------------------------------------------------------------------------------------

		newVehicle: async(_, {vehicle}) =>{
			var userChecker;

			try {
				userChecker = await axios.get(`${URLPerfil}/user/?user_mail=${vehicle.owner}`)
				.then(res => res.data);
			} catch (error) {
				userChecker = false
			}
			
			if(userChecker){
				const result = await axios.post(`${URLVehicles}`, vehicle) 
				.then(res => res.data.data);
				return result;
			}else{
				return new Error('Username not valid')
			}	
		}
		
	}
};

module.exports = {resolvers};
