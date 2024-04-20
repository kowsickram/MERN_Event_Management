import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Preloader from '../../preloader';
import { setSessionStorage } from '../utils';

export default function Student() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const [formData, setFormData] = useState({
    Std_name: '',
    Gender: '',
    Reg_no: '',
    Dept_name: '',
    Clg_name: '',
    Year: '',
    Email: '',
    Phone: '',
    Password: ''
  });
  const [departmentOptions] = useState({
    "Science": ["B.Sc Data Science", "B.Sc Computer Science", "B.Sc Information Technology", "B.Sc Electronics & Communication", "B.Sc Internet Of Things", "B.Sc Biochemistry", "B.Sc Biotechnology", "B.Sc Microbiology", "B.Sc Maths"],
    "Computer Applications": ["BCA", "BBA (Computer Application)", "B.Com (Computer Applications)"],
    "Business": ["BBA (Business Administration)", "BBA (Logistics)", "MBA", "B.Com", "B.Com (Accounts and Finance)", "B.Com (Professional Accounting)", "B.Com (Business Analytics)", "M.Com", "M.Com (International Business)"],
    "English": ["B.A. English Literature", "M.A. English Literature"],
    "Nutrition and Dietetics": ["B.Sc Nutrition and Dietetics", "M.Sc Foods & Nutrition"],
    "Psychology": ["B.Sc. Psychology"],
    "Hospitality Management": ["B.Sc. (CS and HM)"],
    "Mathematics": ["M.Sc Computer Science", "MCA", "M.Sc Applied Electronics", "M.Sc Maths"]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/std_reg', formData);
      console.log(res.data); 
      
      const { Email, Reg_no } = formData; 
      const student = { email: Email, reg_no : Reg_no }; 
      
      // Set session storage
      setSessionStorage('student', student);
      
      // Reload the page
      window.location.reload();
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    {loading ? (
      <div className="flex justify-center items-center h-screen">
      <Preloader />
        </div>
    ) : (
    <div className="max-w-md transition-all mx-auto my-10 p-6 bg-neutral-200 shadow-sm  rounded-lg ">
      <form onSubmit={handleSubmit}>
      <div className='flex w-full items-center justify-center p-2'>
      <img src='./images/rvslogo.png' alt='rvs_logo' width={100} />
      </div>
        <div className="mb-4">
          <input type="text" placeholder='Student Name' name="Std_name" value={formData.Std_name} onChange={handleChange} required className=" p-2 outline-none mt-1 block w-full" />
        </div>
        <div className="mb-4">
          <select name="Gender" value={formData.Gender} onChange={handleChange} required className="p-2 outline-none mt-1 block w-full">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <input type="text" placeholder='Reg_No' name="Reg_no" value={formData.Reg_no} onChange={handleChange} required className="p-2 mt-1 outline-none block w-full" />
        </div>
        <div className="mb-4">
        <select name="Dept_name" value={formData.Dept_name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md">
            <option value="">Select Department</option>
            {Object.keys(departmentOptions).map(category => (
              <optgroup label={category} key={category}>
                {departmentOptions[category].map(option => (
                  <option value={option} key={option}>{option}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="mb-4">
        
          <input type="text" placeholder='College' name="Clg_name" value={formData.Clg_name} onChange={handleChange} required className=" outline-none p-2 mt-1 block w-full" />
        </div>
        <div className="mb-4">
          <input type="number" placeholder='Year' name="Year" value={formData.Year} onChange={handleChange} required className=" outline-none p-2 mt-1 block w-full" />
        </div>
        <div className="mb-4">
          <input type="email" placeholder='Email' name="Email" value={formData.Email} onChange={handleChange} required className="outline-none p-2 mt-1 block w-full" />
        </div>
        <div className="mb-4">
          <input type="number" placeholder='Phone' name="Phone" value={formData.Phone} onChange={handleChange} required className=" outline-none p-2 mt-1 block w-full" />
        </div>
        <div className="mb-4">
          <input type="password" placeholder='Password' name="Password" value={formData.Password} onChange={handleChange} required className="outline-none p-2 mt-1 block w-full" />
        </div>
        <div className='flex justify-center'>
        <button type="submit" className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600">Register</button>
        </div>
        <div className='text-center'>Already Have an Account ? <Link to='/login' className=' text-gray-500'>Login</Link> </div>      
      </form>
    </div>)}
    </>
  );
};

