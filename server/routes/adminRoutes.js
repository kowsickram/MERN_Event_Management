const express = require("express");
const router  = express.Router();
 
const Adminauth = require("../controllers/adminCont")
router.post('/login', Adminauth.admin_login)


module.exports=router;