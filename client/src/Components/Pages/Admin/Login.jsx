import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setSessionStorage } from '../Admin/utils';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLog() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/login', {  adminname : username, adminpass: password });
      console.log(response.data); 
      const admin ={ username }
      setSessionStorage('admin', admin);

      window.location.reload();
          window.location.href = "/";
          toast.success("Login successful");

    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="flex justify-center items-center max-w-md mx-auto my-10 p-6 bg-white shadow-sm rounded-lg ">
      <div className=" flex flex-col justify-center items-center p-8 rounded ">
      <img
            src="./images/rvslogo.png"
            alt="Logo"
            className="logo w-20 h-20 mb-4"
          />
        <h2 className="text-2xl font-normal text-center mb-4">Admin</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              placeholder='Name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className='flex flex-col justify-center items-center'>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <Link
              to="/login"
              className="block mt-4 text-gray-500 hover:underline"
            >
              Student
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
