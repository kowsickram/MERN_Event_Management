const Admin = require("../models/Admin")



exports.admin_login = async (req, res) => {
    const { adminname, password } = req.body;
    console.log(req.body)
  
    try {
      // Find the master by username
      const admin = await Admin.findOne({ adminname });
      console.log(admin)
      if (!admin) {
        return res.status(401).json({ message: 'Invalid mastername or password' });
      }
      // If credentials are valid, send a success response
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };