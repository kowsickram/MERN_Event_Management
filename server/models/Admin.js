const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  adminname: { type: String, required: true },
  adminpass: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

// async function createAdmin() {
//     try {
//       // Create a new master document
//       const newMaster = new Admin({
//         adminname: 'Suryaraj',
//         adminpass: 'surya@123', 
//         gender: 'Male',
//       });
  
//       // Save the master document to the database
//       await newMaster.save();
  
//       console.log('Master document saved successfully');
//     } catch (error) {
//       console.error('Error saving admin document:', error);
//     }
//   }

//   createAdmin();