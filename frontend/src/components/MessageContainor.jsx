import React from 'react';
import Messages from '/src/components/Messages.jsx';
import SendInput from './SendInput.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSelectedUser } from '../redux/userSlice.js';

function MessageContainor() {
  const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();

  // Guard against null or undefined onlineUsers
  const isOnline = onlineUsers?.includes(selectedUser?._id) ?? false;

  // Optional cleanup when component unmounts
  // useEffect(() => {
  //   return () => dispatch(setSelectedUser(null));
  // }, []);

  return (
    <>
      {selectedUser !== null ? (
        <div className="flex flex-col h-full w-full border-l border-zinc-300">
          <div className="flex gap-2 text-black items-center bg-blue-100 rounded p-2 cursor-pointer">
            <div className={`avatar ${isOnline ? 'online' : ''}`}>
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="user-profile" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <h1 className="text-gray-700">Hi {authUser?.fullName}</h1>
          <h1 className="text-gray-600">Select a user to start chatting</h1>
        </div>
      )}
    </>
  );
}

export default MessageContainor;