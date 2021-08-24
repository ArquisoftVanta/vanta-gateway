const { url, v_url, auth, perfil, chat, vehicles, request, viajes, multimedia, notificaciones } = require('./servers');
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
const URLVehicles = `http://${v_url}:${vehicles}/vehicles`;
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

        //INTERFACE Q ----------------------------------------------------------------------
        checkPlaca: async(_, { placa }) => {
            var valid;
            var num;

            const resultCar = await axios.get(`${URLVehicles}/plate_search/${placa}`)
                .then(res => res.data.data[0])

            console.log(resultCar)

            if (resultCar) {
                valid = true;
                //If Car exists look for the amount of services in DB    
                const resultService = await axios.get(`${URLService}/service/vehicle_id/${resultCar.license_plate}`)
                    .then(res => res.data)
                    .catch(err => false);

                console.log(resultService)

                if (resultService) {
                    num = resultService.length
                } else {
                    num = 0
                }
            } else {
                valid = false;
                num = 0;
            }

            return { "valid": valid, "num": num };
        },

        checkCedula: async(_, { cedula }) => {
            var valid;
            var num;

            console.log(cedula)
                //Get HTTP request for the user
            const resultUser = await axios.get(`${URLPerfil}/user/?user_doc=${cedula}`)
                .then(res => res.data)
                .catch(err => false)

            console.log(resultUser)

            if (resultUser) {
                valid = true;
                //If user exists look for the amount of requests in DB    
                const resultRequest = await axios.get(`${URLRequest}/requestUser/?user=${resultUser.user_mail}`)
                    .then(res => res.data)
                    .catch(err => false)

                console.log(resultRequest)

                if (resultRequest) {
                    num = resultRequest.length;
                } else {
                    num = 0;
                }

            } else {
                //If user doesnt exist return false
                valid = false;
                num = 0;
            }
            return { "valid": valid, "num": num };
        },

        checkCedulaService: async(_, { cedula }) => {
            var valid;
            var num;
            console.log(cedula)

            //Get HTTP request for the user
            const resultUser = await axios.get(`${URLPerfil}/user/?user_doc=${cedula}`)
                .then(res => res.data)
                .catch(err => false)

            console.log(resultUser)

            if (resultUser) {
                valid = true;
                //If user exists look for the amount of services in DB    
                const resultService = await axios.get(`${URLService}/service/user_id/${resultUser.user_mail}`)
                    .then(res => res.data)
                    .catch(err => false);
                console.log(resultService)
                if (resultService) {
                    num = resultService.length;
                } else {
                    num = 0;
                }

            } else {
                //If user doesnt exist return false
                valid = false;
                num = 0;
            }
            return { "valid": valid, "num": num };
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
            const result = await axios.get(`${URLRequest}/requestRe/${request_id}`)
                .then(res => res.data);
            console.log(result);
            return result;
        },
        getRequests: async(_) => {
            const result = await axios.get(`${URLRequest}/requestRe`)
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

            //---Quitar el comentario de abajo si no hay acceso al LDAP---
            //ldap = true

            if (ldap) {
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

        //Only allows to create vehicles with a valid user
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

        //Creates a request with its coordinates
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
            const service = await axios.post(`${URLService}/service`, ser)
                .then(res => res.data);

            coor1.service_id = service.service_id;
            coor2.service_id = service.service_id;


            const c1 = await axios.post(`${URLServCoordinates}`, coor1)
                .then(res => res.data);
            const c2 = await axios.post(`${URLServCoordinates}`, coor2)
                .then(res => res.data);
            for (var coord of coords) {
                let aux = 0;
                if (coord.coordinates_id > 0) {
                    const coordresult = await axios.get(`${URLCoordinates}/${coord.coordinates_id}`)
                        .then((res21) => {
                            res21.data.order = coord.order;
                            const result = axios.put(`${URLCoordinates}/${coord.coordinates_id}`, res21.data)
                                .then((res) => {
                                    const result2 = axios.get(`${URLRequest}/request/${res.data.request}`)
                                        .then((res2) => {
                                            let chatInput = {
                                                user1: service.user_id,
                                                user2: res2.data.user_id
                                            }

                                            if (aux % 2 == 0) {
                                                const result = axios.post(`${URLChat}`, chatInput)
                                                    .then(res => res.data);
                                            }
                                            aux = aux + 1;

                                            res2.data.active = 1
                                            res2.data.service_id = service.service_id; //Esto está quemado, pero la idea es que reciba el id del service creado
                                            const result3 = axios.put(`${URLRequest}/request/${res.data.request}`, res2.data)
                                                .then((res) => {});
                                            return result3;
                                        })
                                });
                        });
                }
            }
            return service;
        },

        deleteService: async(_, { id }) => {
            const result1 = await axios.get(`${URLRequest}/requestService/?service=${id}`)
                .then((res1) => {
                    for (var request of res1.data) {
                        const result2 = axios.get(`${URLRequest}/request/${request.request_id}`)
                            .then((res2) => {
                                res2.data.service_id = null
                                res2.data.active = 0
                                const result3 = axios.put(`${URLRequest}/request/${request.request_id}`, res2.data)
                                    .then((res3) => {});
                            })
                    }
                    const result = axios.delete(`${URLService}/service/${id}`)
                        .then(res => res.data);
                    return result;
                })
        },

        showServicesbyUser: async(n_, { user_id }) => {
            const resultService = await axios.get(`${URLService}/service/user_id/${user_id}`)
                .then(resService => {
                    var arrayComplete = []
                    for (var service of resService.data) {
                        var arrayS = []
                        arrayS.push(service)
                        const resultCoordServ = axios.get(`${URLServCoordinates}/${service.service_id}`)
                            .then(resCoorSer => {
                                arrayS.push(resCoorSer.data);
                                const resultRequestByServices = axios.get(`${URLRequest}/requestService/?service=${service.service_id}`)
                                    .then((resRequestByServices) => {
                                        arrayS.push(resRequestByServices.data)
                                        var arrayCoord = []
                                        for (var request of resRequestByServices.data) {
                                            const resultCoor = axios.get(`${URLRequest}/coordinatesRequest/?request=${request.request_id}`)
                                                .then(resCoor => {
                                                    arrayCoord.push(resCoor.data)
                                                });
                                            arrayS.push(arrayCoord)
                                        }
                                    })

                            });
                        arrayComplete.push(arrayS)
                    }
                    console.log(arrayComplete)
                    return arrayComplete;

                })

        }
    }
};
module.exports = { resolvers };