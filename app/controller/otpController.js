const { sendEmailOtp } = require('../services/emailServices');
const { sendSmsOtp } = require('../services/smsService');
const { generateOtp } = require('../utils/otpGenerator');
const sql = require('mssql');
const { poolPromise } = require('../models/db');

const sendOtp = async (req, res) => {
  const { email, mobile } = req.body;
  const otp = generateOtp();
  const now = new Date();

  try {
    if (!email && !mobile) return res.status(400).send("Email or mobile required.");

    if (email) await sendEmailOtp(email, otp);
    if (mobile) await sendSmsOtp(mobile, otp);

    const pool = await poolPromise;

    // Update OTP in your table (assuming one table)
    await pool.request()
      .input('email', sql.NVarChar, email || null)
      .input('mobile', sql.NVarChar, mobile || null)
      .input('otp', sql.NVarChar, otp)
      .input('otp_created_at', sql.DateTime, now)
      .query(`
        UPDATE super_corporate_admin
        SET otp = @otp, otp_created_at = @otp_created_at
        WHERE email = @email OR mobile = @mobile
      `);

    res.send("OTP sent successfully");
  } catch (err) {
    console.error("OTP Error:", err);
    res.status(500).send("Failed to send OTP");
  }
};


module.exports = {sendOtp}


































































/* const { generateOtp } = require('../utils/otpGenerator');
const { sendEmailOtp } = require('../services/emailServices');
const { sendSmsOtp } = require('../services/smsService');
const sql = require('mssql');
const { poolPromise } = require('../models/db');

// Send OTP to email or mobile or both (used when two-factor is toggled on)
const sendOtp = async (req, res) => {
  const { user_id, preferredContact, email, mobile } = req.body;

  if (!user_id || (!email && !mobile)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const otp = generateOtp();
    const pool = await poolPromise;

    await pool.request()
      .input('user_id', sql.Int, user_id)
      .input('otp', sql.NVarChar(6), otp)
      .input('otp_created_at', sql.DateTime, new Date())
      .query(`UPDATE super_corporate_admin SET otp = @otp, otp_created_at = @otp_created_at WHERE user_id = @user_id`);

    if (preferredContact === 'email' || preferredContact === 'both') {
      await sendEmailOtp(email, otp);
    }

    if (preferredContact === 'mobile' || preferredContact === 'both') {
      await sendSmsOtp(mobile, otp);
    }

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Send OTP directly to email or mobile (no preferredContact field)
const sendMobileOtp = async (req, res) => {
  const { mobile, email } = req.body;

  if (!mobile && !email) {
    return res.status(400).json({ error: 'Either mobile or email is required' });
  }

  const otp = generateOtp();

  try {
    const pool = await poolPromise;

    if (mobile) {
      await pool.request()
        .input('mobile', sql.NVarChar, mobile)
        .input('otp', sql.NVarChar(6), otp)
        .input('otp_created_at', sql.DateTime, new Date())
        .query(`UPDATE super_corporate_admin SET otp = @otp, otp_created_at = @otp_created_at WHERE mobile = @mobile`);

      await sendSmsOtp(mobile, otp);
    }

    if (email) {
      await pool.request()
        .input('email', sql.NVarChar, email)
        .input('otp', sql.NVarChar(6), otp)
        .input('otp_created_at', sql.DateTime, new Date())
        .query(`UPDATE super_corporate_admin SET otp = @otp, otp_created_at = @otp_created_at WHERE email = @email`);

      await sendEmailOtp(email, otp);
    }

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

module.exports = {
  sendOtp,
  sendMobileOtp
}; */