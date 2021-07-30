const { url, auth, perfil, chat, vehicles, request, viajes, multimedia, notificaciones } = require('./servers');
const axios = require('axios');
const { getVariableValues } = require('graphql/execution/values');


const URLAuth = `http://${url}:${auth}`;
let config = { headers: { 'Content-Type': 'application/json' }, auth: { username: 'vanta', password: 'dragonfly-software' } }

const URLPerfil = `http://${url}:${perfil}`;
const URLChat = `http://${url}:${chat}/conv`;
const URLRequest = `http://${url}:${request}`;
const URLService = `http://${url}:${viajes}`;
const URLServCoordinates = `http://${url}:${viajes}/service_coordinates`;
const URLCoordinates = `http://${url}:${request}/coordinates`;
const URLMultimedia = `http://${url}:${multimedia}`;
const URLVehicles = `http://${url}:${vehicles}/vehicles`;
const URLNotification = `http://${url}:${notificaciones}/notifications`;

const resolvers = {
    Query: {
        //USER Q ----------------------------------------------------------------------
        userById: async(_, { user_id }) => {
            const result = await axios.get(`${URLPerfil}/user/?user_mail=${user_id}`)
                .then(res => res.data);
            return result;
        },

        userByDoc: async(_, { user_doc }) => {
            const result = await axios.get(`${URLPerfil}/user/?user_doc=${user_doc}`)
                .then(res => res.data);
            return result;
        },

        userByToken: async(_, { token }) => {
            const result = await axios.get(`${URLAuth}/api/user/verify-user?access_token=${token}`, "", config)
                .then(res => res.data);
            return result;
        },


        //CHAT Q ----------------------------------------------------------------------
        chatByUser: async(_, { user_id }) => {
            const result = await axios.get(`${URLChat}/${user_id}`)
                .then(res => res.data);
            return result;
        },
        chatById: async(_, { user_id, chat_id }) => {
            console.log(chat_id);
            const result = await axios.get(`${URLChat}/${user_id}/${chat_id}/`)
                .then(res => res.data);
            return result;
        },


        //VEHICLE Q ----------------------------------------------------------------------
        getVehicle: async(_, { id }) => {
            const result = await axios.get(`${URLVehicles}/${id}`)
                .then(res => res.data.data);
            return result;
        },
        getVehicles: async(_) => {
            const result = await axios.get(`${URLVehicles}/`)
                .then(res => res.data.data);
            return result;
        },

        checkPlaca: async(_, {placa}) =>{
            /*
            const result = await axios.get(`${URLVehicles}/check/${placa}`)
                .then(res => res.data.data);
            return result;

            const result = await axios.get(`${URLService}/service/${car_id}`)
                .then(res => res.data);
            return result;
            */
            return {"valid": true, "num": 1};  
        },
        checkCedula: async(_, {cedula}) =>{
            /*
            const result = await axios.get(`${URLPerfil}/user/?user_mail=${cedula}`)
                .then(res => res.data);
            return result;

            const result = await axios.get(`${URLRequest}/request/${userId}`)
                .then(res => res.data);
            return result;*/
            return {"valid": true, "num": 1};  
        },


        //REQUEST Q ----------------------------------------------------------------------
        getRequestbyUser: async(_, { user_id }) => {
            const result = await axios.get(`${URLRequest}/requestUser/?user=${user_id}`)
                .then(res => res.data);
            return result;
        },
        getRequestActive: async(_, { active }) => {
            const result = await axios.get(`${URLRequest}/requestActive/?active=${active}`)
                .then(res => res.data);
            return result;
        },
        getRequestbyService: async(_, { service_id }) => {
            const result = await axios.get(`${URLRequest}/requestService/?service=${service_id}`)
                .then(res => res.data);
            return result;
        },
        getRequest: async(_, { request_id }) => {
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
        getService: async(_, { service_id }) => {
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
        getServiceCoordinates: async(_) => {
            const result = await axios.get(`${URLServCoordinates}`)
                .then(res => res.data);
            console.log(result);
            return result;
        },
        getCoordinatesByService: async(_, { service_id }) => {
            const result = await axios.get(`${URLServCoordinates}/${service_id}`)
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
        getCoordinatesbyRequest: async(_, { request }) => {
            const result = await axios.get(`${URLRequest}/coordinatesRequest/?request=${request}`)
                .then(res => res.data);
            return result;
        },


        //MULTIMEDIA Q ----------------------------------------------------------------------
        getMultimedias: async(_) => {
            const result = await axios.get(`${URLMultimedia}/multimedia`)
                .then(res => res.data);
            return result;
        },
        getMultimedia: async(_, { id }) => {
            const result = await axios.get(`${URLMultimedia}/multimedia/${id}`)
                .then(res => res.data);
            return result;
        },

        //NOTIFICATIONS Q -------------------------------------------------------------------
        getNotifications: async(_, { token }) => {
            /*         const result = await axios.get(`${URLAuth}/api/user/verify-user?access_token=${token}`, "", config)
                    .then(res => res.data); */
            const user = await axios.get(`${URLAuth}/api/user/verify-user?access_token=${token}`, "", config);

            const result = await axios.get(`${URLNotification}/all/${user.data.userMail}`).then(res => res.data);

            return result;
        }
    },
    Mutation: {


        //USER M ----------------------------------------------------------------------
        loginUser: async(_, { usermail, password }) => {
            const ldap = await axios.get(`${URLAuth}/api/user/loginLdap?username=${usermail}&password=${password}`, "", config)
                .then(res => res.data);
            console.log(ldap);

            //Quitar este comentario si no hay acceso al LDAP
            //ldap = true
            
            if(ldap){
                const result = await axios.post(`${URLAuth}/oauth/token?username=${usermail}&password=${password}&grant_type=password`, "", config)
                    .then(res => res.data);
                console.log(result)
                return result;    
            }
            
        },
        registerUser: async(_, user) => {
            const result = await axios.post(`${URLAuth}/api/user/signup`, JSON.stringify(user.user), config)
                .then(res => res.data);
            return result;
        },
        updateUser: async(_, user) => {
            console.log(user);
            const result = await axios.put(`${URLPerfil}/user/`, user, config)
                .then(res => res.data);
            console.log(result);
            return result;
        },



        //CHAT M ----------------------------------------------------------------------
        createChat: async(_, { chat }) => {
            console.log({ chat })
            const result = await axios.post(`${URLChat}`, chat)
                .then(res => res.data);

            return result;
        },
        sendMessage: async(_, { msg }) => {
            console.log({ msg })
            const result = await axios.put(`${URLChat}`, msg)
                .then(res => res.data)

            return result;
        },


        //VEHICLE M ----------------------------------------------------------------------
        createVehicle: async(_, { vehicle }) => {

            const result = await axios.post(`${URLVehicles}`, vehicle)
                .then(res => res.data.data);
            return result;

        },
        updateVehicle: async(_, { id, vehicle }) => {
            const result = await axios.put(`${URLVehicles}/${id}`, vehicle)
                .then(res => res.data.data);
            return result;
        },
        deleteVehicle: async(_, { id }) => {
            const result = await axios.delete(`${URLVehicles}/${id}`)
                .then(res => res.data.data);
            return result;
        },


        //REQUEST M ----------------------------------------------------------------------
        createRequest: async(_, { request }) => {
            const result = await axios.post(`${URLRequest}/request/`, request)
                .then(res => res.data);
            return result;
        },

        updateRequest: async(_, { request_id, request }) => {
            const result = await axios.put(`${URLRequest}/request/${request_id}`, request)
                .then(res => res.data);
            return result;
        },

        deleteRequest: async(_, { request_id }) => {
            const result = await axios.delete(`${URLRequest}/request/${request_id}`)
                .then(res => res.data);
            console.log(result);
            return result;
        },

        createCoordinates: async(_, { coordinate }) => {
            const result = await axios.post(`${URLCoordinates}/`, coordinate)
                .then(res => res.data);
            return result;
        },

        updateCoordinates: async(_, { coordinates_id, coordinate }) => {
            const result = await axios.put(`${URLCoordinates}/${coordinates_id}`, coordinate)
                .then(res => res.data);
            console.log(result);
            return result;
        },

        createService: async(_, { service }) => {
            console.log(JSON.stringify(service));
            const result = await axios.post(`${URLService}/service`, JSON.stringify(service))
                .then(res => res.data);
            console.log(result);
            return result;
        },
        updateService: async(_, { service }) => {
            const result = await axios.put(`${URLService}/service`, JSON.stringify(service))
                .then(res => res.data);
            return result;
        },
        deleteService: async(_, { id }) => {
            const result = await axios.delete(`${URLService}/service/${id}`)
                .then(res => res.data);
            return result;
        },

        createServCoordinates: async(_, { coordinate }) => {
            const result = await axios.post(`${URLServCoordinates}`, JSON.stringify(coordinate))
                .then(res => res.data);
            return result;
        },
        deleteServCoordinates: async(_, { id }) => {
            const result = await axios.delete(`${URLServCoordinates}/${id}`)
                .then(res => res.data);
            return result;
        },


        //MULTIMEDIA M ----------------------------------------------------------------------
        deleteMultimedia: async(_, { id }) => {
            const result = await axios.delete(`${URLMultimedia}/multimedia/${id}`)
                .then(res => res.data);
            return result;
        },

        //NOTIFICATION M --------------------------------------------------------------------
        createNotification: async(_, { notification }) => {
            const user = await axios.get(`${URLAuth}/api/user/verify-user?access_token=${notification.token}`, "", config);
            notification.user_email = user.data.userMail;
            const result = await axios.post(`${URLNotification}/create`, notification)
                .then(res => res.data);
            console.log(result);
            return result;
        },

        updateNotification: async(_, { notification_id }) => {
            const result = await axios.put(`${URLNotification}/set-viewed/${notification_id}`)
                .then(res => res.data);
            console.log(result);
            return result;
        },

        deleteNotification: async(_, { notification_id }) => {
            const result = await axios.delete(`${URLNotification}/delete/${notification_id}`)
                .then(res => res.data);
            console.log(result);
            return result;
        },


        //-------------------------------------------------------------------------------------------------------
        //--------------------------------------RESOLVERS WITH MULTIPLE CALLS------------------------------------
        //-------------------------------------------------------------------------------------------------------

        newVehicle: async(_, { vehicle }) => {
            var userChecker;

            try {
                userChecker = await axios.get(`${URLPerfil}/user/?user_mail=${vehicle.owner}`)
                    .then(res => res.data);
            } catch (error) {
                userChecker = false
            }

            if (userChecker) {
                const result = await axios.post(`${URLVehicles}`, vehicle)
                    .then(res => res.data.data);
                return result;
            } else {
                return new Error('Username not valid')
            }
        },

        newRequest: async(_, { req, coor1, coor2 }) => {
            const request = await axios.post(`${URLRequest}/request/`, req)
                .then(res => res.data);

            coor1.request = request.request_id;
            coor2.request = request.request_id;
            const c1 = await axios.post(`${URLCoordinates}/`, coor1)
                .then(res => res.data);
            const c2 = await axios.post(`${URLCoordinates}/`, coor2)
                .then(res => res.data);

            return request;
        },

        newService: async(_, { ser, coor1, coor2, coords }) => {
            /*const service = await axios.post(`${URLService}/service`, ser)
                .then(res => res.data);

            console.log(service)

            coor1.service_id = service.service_id;
            coor2.service_id = service.service_id;


            const c1 = await axios.post(`${URLServCoordinates}`, coor1)
                .then(res => res.data);
            const c2 = await axios.post(`${URLServCoordinates}`, coor2)
                .then(res => res.data);
*/
            for (var coord of coords) {
                const result = await axios.put(`${URLCoordinates}/${coord.coordinates_id}`, coord)
                    .then((res) => {
                        console.log(res.data.request)
                        const result2 = axios.get(`${URLRequest}/request/${res.data.request}`)
                            .then((res2) => {
                                console.log(res2.data)
                                res2.data.service_id = 2; //Esto está quemado, pero la idea es que reciba el id del service creado
                                const result3 = axios.put(`${URLRequest}/request/${res.data.request}`, res2.data)
                                    .then(res => res.data);
                                return result3;

                            })
                    });
            }



            return service;
        }

    }
};
module.exports = { resolvers };