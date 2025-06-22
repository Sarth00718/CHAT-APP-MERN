import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '../main';

const Sidebar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`, {
                withCredentials: true,
            });
            toast.success(res.data.message); // Use the response properly
            dispatch(setAuthUser(null));
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error(error.response?.data?.message || "Logout failed!");
        }
    };

    // Live filter users
    const filteredUsers = otherUsers?.filter(user =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={(e) => e.preventDefault()} className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered rounded-md'
                    type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-zinc-700 text-white'>
                    <BiSearchAlt2 className='w-6 h-6 outline-none' />
                </button>
            </form>

            <div className="divider px-3"></div>

            <div className='overflow-auto flex-1'>
                <OtherUsers users={filteredUsers} />
            </div>

            <div className='mt-2'>
                <button className='btn btn-sm' onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
