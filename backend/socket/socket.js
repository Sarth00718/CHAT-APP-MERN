import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:['http://localhost:5173'],
        //origin: ['https://chat-app-mern-murex.vercel.app'],
        methods:['GET', 'POST'],
    },
});

export const getRecieverSocketId = (receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap = {};

io.on('connection',(socket)=>{
    console.log('a new user connected', socket.id);
    const userId = socket.handshake.query.userId;
    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUser',Object.keys(userSocketMap));

    socket.on('disconnect',()=>{
        console.log('a user disconnected', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUser',Object.keys(userSocketMap));
    })
})

export {app,server,io};