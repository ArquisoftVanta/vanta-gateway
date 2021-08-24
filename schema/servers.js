const url = process.env.HOST || 'localhost'
var v_url = process.env.VHOST || 'localhost'
const gateway = process.env.API || '8000'

const auth = process.env.AUTH || '8443'
const perfil = process.env.PRF || '8200'
const request = process.env.RQT || '8300'
const viajes = process.env.VIJ || '8400'
const vehicles = process.env.VHC || '3001'
const chat = process.env.CHT || '8600'
const multimedia = process.env.MULT || '8700'
const notificaciones = process.env.NOTS || '3000'

module.exports = { url, auth, perfil, request, viajes, vehicles, chat, multimedia, notificaciones, gateway }