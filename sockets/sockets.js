var sockets = function(socket, next){
	
    const user = socket.handshake.auth.usr
    const chat = socket.handshake.auth.cht

    if(!user || !chat){
        return next(new Error("invalid username or chat"));
    }
    socket.username = user;
    socket.chatid = chat;
    next();
}

module.exports = sockets;