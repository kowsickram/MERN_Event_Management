const express = require("express");
const { models } = require("mongoose");
const router  = express.Router();
 
// Student Registeration
const std_auth = require("../controllers/stdControl")
router.post('/std_reg', std_auth.std_reg)
router.post('/std_log', std_auth.std_log)


router.get('/get_id', std_auth.std_id)

module.exports=router;