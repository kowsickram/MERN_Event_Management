import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Preloader from "../../preloader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setSessionStorage } from '../utils';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    reg_no: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = formData.email ? "" : "Email is required";
    tempErrors.reg_no = formData.reg_no
      ? ""
      : "Registration number is required";
    tempErrors.password = formData.password ? "" : "Password is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:5000/api/std_log", {
          email: formData.email,
          reg_no: formData.reg_no,
          password: formData.password,
        });
  
        if (response.status === 200) {
          const { email, reg_no } = formData;
          const student = { email, reg_no };
          
          // Set session storage
          setSessionStorage('student', student);
          
          // Reload the page
          window.location.reload();
          window.location.href = "/";
          toast.success("Login successful");
          const data = response.data;
        } else {
          toast.error("Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };
  

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
      <Preloader />
        </div>
      ) : (
        <div className="flex transition-all flex-col items-center justify-center min-h-screen">
          <ToastContainer theme="light" />
          <img
            src="./images/rvslogo.png"
            alt="Logo"
            className="logo w-20 h-20 mb-4"
          />

          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              className={`form-input ${errors.email ? "input-error" : ""}p-2`}
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div className="error-message">{errors.email}</div>

            <input
              className={`form-input ${errors.reg_no ? "input-error" : ""}p-2`}
              type="text"
              name="reg_no"
              placeholder="Reg No"
              value={formData.reg_no}
              onChange={handleInputChange}
            />
            <div className="error-message">{errors.reg_no}</div>

            <input
              className={`form-input ${
                errors.password ? "input-error" : ""
              } p-2`}
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <div className="error-message">{errors.password}</div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <span className="inline">
            Don't have an account?
            <Link
              to="/std-reg"
              className="block mt-4 text-blue-500 hover:underline"
            >
              Sign up
            </Link>
            <Link
              to="/ad-login"
              className="block mt-4 text-blue-500 hover:underline"
            >
              Admin
            </Link>
          </span>
        </div>
      )}
      ;
    </>
  );
}
