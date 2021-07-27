var socketFuncs = function(socket){

    socket.join(socket.chatid);
    console.log(socket.username + " se conecto al chat " + socket.chatid)

    socket.on("private message", ({content, user, chatId}) => {
        socket.to(chatId).emit("private message", {content, user});
    });

    socket.on("disconnect", (socket)=>{
        console.log(" se desconectaron del chat")    
    })
}

module.exports = socketFuncs;