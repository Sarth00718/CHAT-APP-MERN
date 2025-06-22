import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '../main';

function Login() {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      dispatch(setAuthUser(res.data)); // Store user in Redux
      toast.success("Login successful!");
      navigate('/');
    } catch (error) {
      console.log("Error:", error);
      toast.error(error?.response?.data?.message || "Login failed. Please try again.");
    }

    // Reset form
    setUser({
      username: '',
      password: ''
    });
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-xl backdrop-blur-lg bg-white/10 border border-white/30 shadow-lg">
        <h1 className="font-bold text-3xl text-center text-white mb-6">Login</h1>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-white mb-1" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          Don't have an account?{' '}
          <Link to="/Signup" className="text-blue-300 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
