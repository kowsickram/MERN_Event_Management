import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState(null);

  const student = JSON.parse(sessionStorage.getItem("student"));

  useEffect(() => {
    fetchEvents();
    fetchstudentID();
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/event/get_events"
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchstudentID = async () => {
    try {
      const studentIdResponse = await axios.get(
        `http://localhost:5000/api/get_id`,
        {
          params: {
            email: student.email,
            reg_no: student.reg_no,
          },
        }
      );
      setStudentId(studentIdResponse.data.id);
    } catch (error) {
      console.error("Error fetching StudentID:", error);
    }
  };

  const handleEnroll = async (eventId, slot) => {
    if (slot === 0) {
      toast.error("Slots are filled for this event!");
    } else {
      setSelectedEvent(eventId);
      setOpen(true);
    }
  };

  const handleEnrollmentConfirmation = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/event/enroll/${selectedEvent}`,
        {
          studentId: studentId,
          slot: events.find(event => event._id === selectedEvent).Slot, // Pass the Slot value
        }
      );
  
      const updatedEvents = events.map(event =>
        event._id === selectedEvent ? { ...event, Slot: event.Slot - 1 } : event
      );
      setEvents(updatedEvents);
  
      toast.success("You have successfully enrolled for the event!");
      setOpen(false);
    } catch (error) {
      console.error("Error enrolling:", error);
      toast.info("Already Registered ");
    }
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer theme="light" position="bottom-right" />
      <h1 className="text-3xl p-4 text-center font-bold mb-4 bg-slate-300">
        Events
      </h1>
      <div className="flex flex-wrap w-fit -mx-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl text-center font-bold mb-2">
                {event.Event_name}
              </h2>
              <p className="text-gray-600 text-center p-2">{event.Evnt_Type}</p>
              <p className="text-black text-center p-2">
                Available Slots : {event.Slot}
              </p>
              <div className="flex justify-center items-center p-2">
                <Button
                  onClick={() => handleEnroll(event._id, event.Slot)}
                  variant="contained"
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ${event.Slot === 0 && 'cursor-not-allowed'}`}
                  disabled={event.Slot === 0}
                >
                  {event.Slot === 0 ? "Slots Filled" : "Enroll"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Enrollment</DialogTitle>
        <DialogContent>
          Are you sure you want to enroll for this event?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEnrollmentConfirmation} color="primary">
            Enroll
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
