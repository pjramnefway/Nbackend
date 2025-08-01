const express = require('express');
const router = express.Router();
const otpController = require('../controller/otpController');

// Route: POST /send-otp
router.post('/send-otp', otpController.sendOtp);

module.exports = router;
