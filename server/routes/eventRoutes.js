const express = require('express');
const router = express.Router();


const event_control = require("../controllers/eventControl")

router.get('/get_events',event_control.get_event);

router.get('/enrolled_events', event_control.enrolled_evt);

router.get('/enroll_std', event_control.enroll_std);

router.post('/enroll/:eventId',event_control.enroll_student);

router.post('/add_event', event_control.add_event)

router.put('/update_event/:eventId', event_control.update_event);

router.delete('/delete_event/:eventId', event_control.delete_event);

router.delete('/delete_std/:eventId/:studentId',event_control.delete_std)
  

module.exports = router;
