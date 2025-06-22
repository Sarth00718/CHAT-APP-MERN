import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector , useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "../main";


const useGetMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);
  return (
    useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) return;
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser._id}`);
        console.log(res.data);
        dispatch(setMessages(res.data));
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser?._id])
  )
};
export default useGetMessages;