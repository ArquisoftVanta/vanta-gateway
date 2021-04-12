const { url, auth, perfil, chat } = require('./servers');
const axios = require('axios')

const URLAuth = `http://${url}:${auth}`;
const URLPerfil = `http://${url}:${perfil}`;
const URLChat = `http://${url}:${chat}/conv`;

const resolvers = {
	Query: {
		userById(id){
			//generalRequest(`${URLPerfil}/${id}`, 'GET')
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
		loginUser(user){
			//authorizedRequest(`${URLAuth}/oauth/token`, 'POST', user)
		},
		registerUser(user){
			//authorizedRequest(`${URLAuth}/api/user/signup`, 'POST', user)
		},
		updateUser(user){
			//generalRequest(`${URLPerfil}/${id}`, 'POST', user)
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
