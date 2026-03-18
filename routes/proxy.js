const express = require('express');
const router = express.Router();
const { proxy } = require('../proxy/proxy');
const { verifyToken } = require('../middleware/auth');

router.get('/hi', verifyToken, proxy('/hi'));

router.get('/scholarship/user', verifyToken, proxy('/scholarship/user'));
router.get('/scholarship/user/new', verifyToken, proxy('/scholarship/user/new'));
router.get('/scholarship/user/amount', verifyToken, proxy('/scholarship/user/amount'));
router.get('/scholarship/each', proxy('/scholarship/each'));
router.use('/scholarship/each/status', verifyToken, proxy('/scholarship/each/status'));
router.use('/scholarship/each/save', verifyToken, proxy('/scholarship/each/save'));
router.use('/scholarship/each/cancel', verifyToken, proxy('/scholarship/each/cancel'));

router.get('/documents', proxy('/documents'));
router.get('/document/each', proxy('/document/each'));

router.use('/user/all', proxy('/user/all'));

module.exports = router;
