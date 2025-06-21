import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUser from '../hook/useGetOtherUser';
import { useSelector } from 'react-redux';

const OtherUsers = ({ users }) => {
    useGetOtherUser(); // Keeps Redux data fresh

    const otherUsersFromStore = useSelector(store => store.user.otherUsers);
    const userList = users ?? otherUsersFromStore;

    if (!userList) return <div className="p-4 text-gray-700">Loading users...</div>;
    if (userList.length === 0) return <div className="p-4 text-gray-700">No users found.</div>;

    return (
        <div className='overflow-auto flex-1'>
            {userList.map(user => (
                <OtherUser key={user._id} user={user} />
            ))}
        </div>
    );
};

export default OtherUsers;
