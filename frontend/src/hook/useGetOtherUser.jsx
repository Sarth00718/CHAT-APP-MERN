import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOtherUsers } from '../redux/userSlice.js' 
import { BASE_URL } from '../main.jsx'
const useGetOtherUser = () => {
    const dispatch = useDispatch();

    return (
        useEffect(() => {
            const getOtherUser = async () => {
                try {
                    axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
                    const res = await axios.get(`${BASE_URL}/api/v1/user/getother`)
                    console.log("Other users fetched successfully:", res.data);
                    dispatch(setOtherUsers(res.data.users)); // Assuming you have an action to set other users
                } catch (error) {
                    console.error("Error fetching other user:", error);
                }
            }
            getOtherUser();
        }, []
        )
    )
}

export default useGetOtherUser
