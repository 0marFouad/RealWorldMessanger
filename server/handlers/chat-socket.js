const db = require('../models');
const authenticate = require('../middlewares/auth');

const chatSocket = (io) => {
    io.sockets.on('connection', (socket) => {
       console.log('Socket Connected Successfully ', socket.id);

       socket.on('message', (data) => {
           try{
               socket.emit('message',data);
               db.Message.create(data);
           }catch(err){
               err.message = 'Error Happened With database';
               next(err);
           }
       });

    });
};

module.exports = {
    chatSocket
};

