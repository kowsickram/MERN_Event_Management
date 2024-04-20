const mongoose =require("mongoose")
const studentSchema = new mongoose.Schema({
    Std_name: {
        type: String,
        required: true
    },
    Gender:{
       type: String,
       enum:['Male','Female'],
       required: true
   },
    Reg_no: {
        type:String,
        unique :true 
    },
    Dept_name:{
        type:String,
        required: true
    },
    Clg_name:{
        type:String,
        required: true
    },
    Year:{
        type:Number,
        required: true
    },
    Email: {
        type: String,
        required:true
    },
    Pass: {
        type: String,
        required:true
    },
    Phone:{
        type: Number,
        required:true
    }
  });
  
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;