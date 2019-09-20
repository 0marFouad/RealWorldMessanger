const db = require('../models');

const serverSocket = (io) => {

    const getOnlineUsers = () => {
      let clients = io.sockets.clients().connected;
      let sockets = Object.values(clients);
      let users = sockets.map(s => s.user);
      return users.filter(u => u != undefined);
    };


    io.sockets.on('connection', (socket) => {
       console.log('Socket Connected Successfully ', socket.id);

       const emitOnlineUsers = () => {
           console.log("OMAR HERE");
           console.log(getOnlineUsers());
            socket.broadcast.emit('users', getOnlineUsers());
            socket.emit('users', getOnlineUsers());
       };

       socket.on('MsgFromClient', (data) => {
           console.log("Recieved From Client");
           try{
               db.Message.create(data);
               socket.emit('MsgFromServer',data);
               socket.broadcast.emit('MsgFromServer',data);
           }catch(err){
               err.message = 'Error Happened With database';
               next(err);
           }
       });

        socket.on('stream', (data) => {
            socket.emit('stream',data);
            socket.broadcast.emit('stream',data);
        });


        socket.on('addOnlineUser', (user) => {
            socket.user = user;
            emitOnlineUsers();
        });

        socket.on('removeUser',() => {
            socket.user = null;
            emitOnlineUsers();
        });
        emitOnlineUsers();
    });
};

module.exports = {
    chatSocket: serverSocket
};

