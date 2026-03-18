const express = require('express');
const router = express.Router();
const calendarController = require('../controller/calendar');
const { verifyToken } = require('../middleware/auth');

router.get('/end/:year/:month', verifyToken, calendarController.countDayCalendarApi);

module.exports = router;
