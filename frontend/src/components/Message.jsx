import React, { useEffect, useRef } from 'react'
import {useSelector} from "react-redux";

const Message = ({message}) => {
    const scroll = useRef();
    const {authUser, selectedUser} = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({behavior:"smooth"});
    }, [message]);

    // Function to format timestamp
    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        
        const messageDate = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - messageDate) / (1000 * 60 * 60);
        
        // If message is from today, show only time
        if (diffInHours < 24 && messageDate.getDate() === now.getDate()) {
            return messageDate.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
        }
        // If message is from yesterday
        else if (diffInHours < 48 && messageDate.getDate() === now.getDate() - 1) {
            return `Yesterday ${messageDate.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            })}`;
        }
        // If message is older, show date and time
        else {
            return messageDate.toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
    };

    // Alternative simpler format function
    // const formatTimeSimple = (timestamp) => {
    //     if (!timestamp) return '';
    //     return new Date(timestamp).toLocaleTimeString([], { 
    //         hour: '2-digit', 
    //         minute: '2-digit',
    //         hour12: true 
    //     });
    // };

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img 
                        alt="User avatar" 
                        src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto} 
                    />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-black">
                    {formatTime(message?.createdAt || message?.timestamp)}
                </time>
            </div>
            <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''}`}>
                {message?.message}
            </div>
        </div>
    );
};

export default Message;