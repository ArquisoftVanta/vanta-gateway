const { url, auth, perfil, chat } = require('./servers');
const axios = require('axios')

const URLAuth = `http://${url}:${auth}`;
let config = {headers: {'Authorization': 'Basic dmFudGE6ZHJhZ29uZmx5LXNvZnR3YXJl',
						'Content-Type': 'application/json'}}

const URLPerfil = `http://${url}:${perfil}`;
const URLChat = `http://${url}:${chat}/conv`;

//TODO: Añadir JWT?????
const resolvers = {
	Query: {
		//TODO: Añadir la imagen antes de devolver resultado?????
		userById(id){
			/*
			const result = await axios.get(`${URLPerfil}/${id}`)
			.then(res => res.data);
			return result;
			*/
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
		}
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
		}
	}
};

module.exports = {resolvers};
