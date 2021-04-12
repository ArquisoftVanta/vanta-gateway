const { url, auth, perfil, chat } = require('./servers');

const URLAuth = `http://${url}:${auth}`;
const URLPerfil = `http://${url}:${perfil}`;
const URLChat = `http://${url}:${chat}/conv`;

const resolvers = {
	Query: {
		userById(id){
			//generalRequest(`${URLPerfil}/${id}`, 'GET')
		},


		chatByUser(id){

		},
		chatById(user, chat){

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



		createChat(chat){

		},
		sendMessage(message){

		}
	}
};

module.exports = {resolvers};
