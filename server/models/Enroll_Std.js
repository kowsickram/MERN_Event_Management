const mongoose = require("mongoose");

const enrolledStudentSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  }
});

const EnrolledStudent = mongoose.model('EnrolledStudent', enrolledStudentSchema);

module.exports = EnrolledStudent;