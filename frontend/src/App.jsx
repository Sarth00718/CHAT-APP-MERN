// App.jsx
import React, { useEffect, useState } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Homepage from './components/Homepage.jsx';
import { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { setOnlineUsers } from './redux/userSlice';
import { setSocket } from './redux/socketSlice';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
        </Route>
    )
);

function App() {

    const { authUser } = useSelector(store => store.user);
    const { socket } = useSelector(store => store.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(authUser);
        if (authUser) {
            const socketio = io('http://localhost:3000', {
                query: {
                    userId: authUser._id
                }
            });
          dispatch(setSocket(socketio));
          //console.log(socketio)

            socketio.on('getOnlineUser', (onlineUsers) => {
               // console.log('helllo',onlineUsers);
                dispatch(setOnlineUsers(onlineUsers))
            });
            return () => socketio.close();
        } else {
            if (socket) {
                socket.close();
                dispatch(setSocket(null));
            }
        }

    }, [authUser]);

    return (
        <>
            <RouterProvider router={router} />
            <Toaster />
        </>
    );
}

export default App;
