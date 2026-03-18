const express = require('express');
const router = express.Router();
const scholarshipController = require('../controller/scholarship');

router.post('/generate', scholarshipController.createScholarshipApi);

module.exports = router;
