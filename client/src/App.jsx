// App.js

import React from 'react';
import {  HashRouter, Route, Routes, } from 'react-router-dom';
import Home from './Components/Pages/Home';
import AllEvents from './Components/Events/All_Events';
import Navbar from './Components/NavBar';
import ContactUs from './Components/Pages/ContactUs';
import MyEvents from './Components/Events/My_Event';

//Student
import StudentReg from './Components/Pages/Student/Register';
import Login from './Components/Pages/Student/Login';

//Admin
import AdminLog from './Components/Pages/Admin/Login';
import AdminDashboard from './Components/Pages/Admin-Dashboard';
import EventForm from './Components/Pages/Admin/Event_Form';
import LiveEvents from './Components/Pages/Admin/LiveEvents';

const App = () => {
  return (
    <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all_events" element={<AllEvents />} />
            <Route path="/event_form" element={<EventForm />} />
            <Route path="/std-reg" element={<StudentReg />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ad-login" element={<AdminLog />} />
            <Route path="/live_events" element={<LiveEvents />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
    </HashRouter>
  );
};
export default App;
