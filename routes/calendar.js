const express = require('express');
const router = express.Router();
const calendarController = require('../controller/calendar');
const { verifyToken } = require('../middleware/auth');

router.get('/:year/:month', verifyToken, calendarController.yearDateCalendarApi);
router.get('/:year/:month/:day', verifyToken, calendarController.yearDateDayCalendarApi);

module.exports = router;
