import React from 'react'
import { IoSend } from 'react-icons/io5'
import  useState  from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import axios from 'axios';
import { BASE_URL } from '../main';


function SendInput() {
  const [message, setMessage] = React.useState('');
  const { selectedUser } = useSelector(store => store.user);
  const { messages } = useSelector(store => store.message);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser._id}`, {message}, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setMessage('');
      console.log(res.data);
      dispatch(setMessages([...messages, res.data])); // Assuming you have an action to set messages
    } catch (error) {
      console.error("Failed to send message:", error);
    }
    //alert(`Message sent: ${message}`);
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='px-4 my-3'>
        <div className='w-full relative'>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder='Send a message...'
            className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-800 text-white'
          />
          <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
            <IoSend />
          </button>
        </div>
      </form>
    </div>
  )
}

export default SendInput
