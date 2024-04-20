const Event = require("../models/Event");
const EnrolledStudent = require('../models/Enroll_Std');
const multer = require('multer');
// Define multer storage for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
exports.get_event = async (req, res) => {
        try {
          const events = await Event.find();
          res.json(events);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
}

const upload = multer({ storage });


exports.add_event = async (req, res) => {
  try {
    const { Event_name, Desc, Evnt_Type, Slot } = req.body;

    // Create a new event instance
    const newEvent = new Event({
      Event_name,
      Desc,
      Evnt_Type,
      Slot
    });

    // Save the event to the database
    await newEvent.save();

    // Send a success response
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'An error occurred while creating the event' });
  }
};



exports.enroll_student = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { studentId, slot } = req.body;

    // Check if slots are available
    if (slot <= 0) {
      return res.status(400).json({ error: 'Slots are filled for this event' });
    }

    // Check if the student is already enrolled for the event
    const existingEnrollment = await EnrolledStudent.findOne({ eventId, studentId });
    if (existingEnrollment) {
      return res.status(400).json({ error: 'Student is already enrolled for this event' });
    }

    // Enroll the student in the event
    const enrollment = new EnrolledStudent({ eventId, studentId });
    await enrollment.save();

    // Update the event's slot count
    const event = await Event.findById(eventId);
    event.Slot -= 1;
    await event.save();

    res.status(200).json({ message: 'Enrollment successful' });
  } catch (error) {
    console.error('Error enrolling student:', error);
    res.status(500).json({ message: 'Error enrolling student' });
  }
};



exports.update_event = async (req, res) => {
  const { eventId } = req.params;
  const { Event_name, Desc, Evnt_Type, Slot } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, {
      Event_name,
      Desc,
      Evnt_Type,
      Slot
    }, { new: true });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Error updating event" });
  }
};

exports.delete_event = async (req, res) => {
  const { eventId } = req.params;
  console.log(req.params)
  try {
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Error deleting event" });
  }
};


// Route to get enrolled events for a student
exports.enrolled_evt = async (req, res) => {
   try {
    const studentId = req.query.studentId; 
    const enrolledEvents = await EnrolledStudent.find({ studentId }).populate('eventId');
    const eventsData = enrolledEvents.map(enrolledEvent => enrolledEvent.eventId);

    res.status(200).json(eventsData);
  } catch (error) {
    console.error('Error fetching enrolled events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.delete_std = async (req, res) => {
  const { eventId, studentId } = req.params;
  try {
    await EnrolledStudent.deleteOne({ eventId, studentId });

    res.status(200).json({ message: 'Student removed from event successfully' });
  } catch (error) {
    console.error('Error removing student from event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.enroll_std =  async (req, res) => {
  try {
    const enrolledStudents = await EnrolledStudent.find().populate('eventId').populate('studentId');
    res.json(enrolledStudents);
  } catch (error) {
    console.error('Error fetching enrolled students:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};