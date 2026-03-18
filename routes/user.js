const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { verifyToken } = require('../middleware/auth');

router.post('/login', userController.loginApi);
router.post('/signup', userController.signupApi);
router.post('/change/password', userController.changePasswordApi);
router.post('/onboard', verifyToken, userController.onboardApi);
router.get('/onboard/check', verifyToken, userController.checkOnboardApi);
router.get('/hashtag', verifyToken, userController.hashtagApi);
router.get('/login/check', verifyToken, userController.checkLoginApi);
router.post('/create/devicetoken', verifyToken, userController.userDeviceToken);

module.exports = router;
