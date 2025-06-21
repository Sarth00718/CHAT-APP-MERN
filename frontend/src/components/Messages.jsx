import React from 'react';
import Message from './Message.jsx';
import useGetMessages from '../hook/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hook/useGetRealtimeMessage.jsx';

function Messages() {
  useGetRealTimeMessage();
  useGetMessages();
  const { messages } = useSelector(store => store.message);
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {messages?.length > 0 &&
        messages.map((message, index) => {
          if (!message || !message._id) return null;
          return <Message key={message._id || index} message={message} />;
        })}
    </div>
  );
}

export default Messages;
