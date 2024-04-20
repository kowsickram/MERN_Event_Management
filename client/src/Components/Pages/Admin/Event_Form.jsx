import React, { useState } from 'react';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EventForm()  {
  const [formData, setFormData] = useState({
    Event_name: '',
    Desc: '',
    Evnt_Type: '',
    Slot: 1,
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/event/add_event', formData);
      toast.success('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Error creating event');
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="flex flex-col justify-center items-center m-4 p-4">
      <h1 className="text-2xl text-center font-semibold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="Event_name"
          value={formData.Event_name}
          onChange={handleChange}
          placeholder="Event Name"
          className="w-full border rounded-md px-4 py-2"
        />
        <textarea
          name="Desc"
          value={formData.Desc}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded-md px-4 py-2"
        ></textarea>
        <select
          name="Evnt_Type"
          value={formData.Evnt_Type}
          onChange={handleChange}
          className="w-full border rounded-md px-4 py-2"
        >
          <option value="">Select Event Type</option>
          <option value="Solo">Solo</option>
          <option value="Duo">Duo</option>
          <option value="Group">Group</option>
        </select>
        <input
          type="number"
          name="Slot"
          value={formData.Slot}
          onChange={handleChange}
          placeholder="Slot"
          className="w-full border rounded-md px-4 py-2"
        />
        <div className='flex justify-center items-center w-full'>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
        >
          Create Event
        </button>
        </div>
      </form>
    </div>
    </>
  );
};

