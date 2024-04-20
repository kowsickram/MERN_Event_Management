import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Tabs, Tab, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function Dashboard() {
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [studentsByEvent, setStudentsByEvent] = useState({});
  const [genderImages, setGenderImages] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [eventToDeleteFrom, setEventToDeleteFrom] = useState(null);

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/event/enroll_std');
        setEnrolledStudents(response.data);
      } catch (error) {
        console.error('Error fetching enrolled students:', error);
      }
    };

    fetchEnrolledStudents();
  }, []);

  useEffect(() => {
    const groupedStudents = enrolledStudents.reduce((acc, student) => {
      const eventId = student.eventId?._id; // Null check added
      if (!acc[eventId]) {
        acc[eventId] = [];
      }
      acc[eventId].push(student);
      return acc;
    }, {});

    setStudentsByEvent(groupedStudents);

    const maleImagePath = '/icons/male.png';
    const femaleImagePath = '/icons/female.png';
    const genderImagesMap = {};
    enrolledStudents.forEach(student => {
      const gender = student.studentId?.Gender;
      if (gender && !genderImagesMap[gender]) {
        genderImagesMap[gender] = gender === 'Male' ? maleImagePath : femaleImagePath;
      }
    });
    setGenderImages(genderImagesMap);
  }, [enrolledStudents]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/event/delete_std/${eventToDeleteFrom}/${studentToDelete}`);
      setConfirmDialogOpen(false);
    } catch (error) {
      console.error('Error removing student from event:', error);
    }
  };

  const openConfirmDialog = (studentId, eventId) => {
    setStudentToDelete(studentId);
    setEventToDeleteFrom(eventId);
    setConfirmDialogOpen(true);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    Object.entries(studentsByEvent).forEach(([eventId, students]) => {
      // Add event name as title for each table
      doc.text(`Event: ${students[0]?.eventId?.Event_name}`, 10, 10);
      
      const tableData = students.map(student => [
        student.studentId.Std_name,
        student.studentId.Dept_name,
        student.studentId.Clg_name,
        student.studentId.Phone,
        student.studentId.Reg_no
      ]);
  
      // Generate table for each event
      doc.autoTable({
        head: [['Name', 'Department', 'College', 'Phone', 'Registration Number']],
        body: tableData,
        startY: 20 // Position the table below the event title
      });
  
      // Add page break after each table
      doc.addPage();
    });
  
    doc.save('enrolled_students_report.pdf');
  };

  return (
    <div className="container mx-auto p-8">
      <Tabs value={tabValue} onChange={handleChangeTab} variant="scrollable" scrollButtons="auto">
        {Object.entries(studentsByEvent).map(([eventId, students], index) => (
          <Tab key={index} label={students[0]?.eventId?.Event_name} />
        ))}
      </Tabs>
      <div className="">
        {Object.entries(studentsByEvent).map(([eventId, students], index) => (
          <div key={index} className={`bg-white shadow-md rounded-lg p-4 ${tabValue !== index && 'hidden'}`}>
            <div className="text-gray-600 text-center m-2">Total Students: {students.length}</div>
            <TableContainer component={Paper} style={{ width: '100%' }}>
              <Table style={{ maxWidth: '90%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>College</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Reg_No</TableCell>
                    <TableCell>Action</TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student, studentIndex) => (
                    <TableRow key={studentIndex}>
                      <TableCell>
                        <img src={genderImages[student.studentId?.Gender]} alt="Avatar" className="w-8 h-8 rounded-full" />
                      </TableCell>
                      <TableCell>{student.studentId?.Std_name}</TableCell>
                      <TableCell>{student.studentId?.Dept_name}</TableCell>
                      <TableCell>{student.studentId?.Clg_name}</TableCell>
                      <TableCell>{student.studentId?.Phone}</TableCell>
                      <TableCell>{student.studentId?.Reg_no}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => openConfirmDialog(student.studentId?._id, eventId)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </div>
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this student from the event?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      <Button onClick={downloadPDF}>Download Report as PDF</Button>
    </div>
  );
};
