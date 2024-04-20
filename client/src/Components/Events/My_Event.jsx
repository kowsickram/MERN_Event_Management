import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MyEvents() {
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const student = JSON.parse(sessionStorage.getItem("student"));
  const [studentId, setStudentId] = useState(null); 

  
  useEffect(() => {
    fetchstudentID();
  }, []);
  
  useEffect(() => {
    if (studentId) {
      fetchEnrolledEvents();
    }
  }, [studentId]);
  
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
        console.log(studentIdResponse.data.id)
        setStudentId(studentIdResponse.data.id);
      } catch (error) {
        console.error("Error fetching StudentID:", error);
      }
    };
    
    const fetchEnrolledEvents = async () => {
      try {
     
      const response = await axios.get(
        "http://localhost:5000/event/enrolled_events",
        { params: { studentId: studentId } }
      );
      setEnrolledEvents(response.data);
    } catch (error) {
      console.error("Error fetching enrolled events:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-semibold p-2 mb-4 bg-slate-300">
        My Events
      </h1>
      <div className="flex flex-wrap -mx-4">
        {enrolledEvents.map((event) => (
          <div
            key={event._id}
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl text-center font-bold mb-2">
                {event.Event_name}
              </h2>
              <p className="text-gray-600 text-center">{event.Evnt_Type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
