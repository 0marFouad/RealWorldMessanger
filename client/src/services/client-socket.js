import io from 'socket.io-client';

const socket = io('http://localhost:4040');

function handleRecieveMessage(handleMessageArrival){
    socket.on('MsgFromServer', (data) => {
        console.log("Client Recieved "+ data);
        handleMessageArrival(data);
    });
};

function handleDisconnect() {
    socket.emit('removeUser',function(){
       console.log("Disconnecting");
    });
}

function emitMessage(data){
    socket.emit('MsgFromClient', data);
}

function addUser(data){
    socket.emit('addOnlineUser',data);
}


function SendStream(data){
    socket.emit('stream', data);
}

function GetUsers(handleUsersArrival){
    socket.on('users', (data) =>{
        console.log("Recieved New List");
        console.log(data);
        handleUsersArrival(data);
    });
}

function RecieveStream(handleStreamArrival){
    socket.on('stream', (data) =>{
        handleStreamArrival(data);
    });
}

export default {
    handleRecieveMessage,
    handleDisconnect,
    emitMessage,
    addUser,
    SendStream,
    RecieveStream,
    GetUsers
};