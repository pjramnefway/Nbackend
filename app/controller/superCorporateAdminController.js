const userModel = require('../models/userModel');
const superCorporateAdminModel = require('../models/superCorporateAdminModel');
const bcrypt = require('bcrypt');
const {poolPromise ,mssql }= require('../models/db')


// ✅ Create Super Corporate Admin
const createSuperAdmin = async (req, res) => {
  try {
    const {
      fullName, username, email, mobile, gender, designation,
      companyName, corporateCode, department, officeLocation,
      role, password, confirmPassword, otp, twoFactor,
      alternateContact, officialEmail, preferredContact, employeeCode
    } = req.body;

    // ✅ Uploaded files
    const profilePhoto = req.files?.profilePhoto?.[0]?.filename || null;
    const idProof = req.files?.idProof?.[0]?.filename || null;
    const corporateIdCard = req.files?.corporateIdCard?.[0]?.filename || null;
    const digitalSignature = req.files?.digitalSignature?.[0]?.filename || null;

    const access_level = role || 'super_admin';

    // ✅ Password validation
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    // ✅ Hash password (optional if storing in users table)
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create User record
  // 1. Insert into users table
    const pool = await poolPromise;
    const userResult = await pool.request()
      .input('email', mssql.NVarChar, email)
      .input('password', mssql.NVarChar, hashedPassword)
      .input('role', mssql.NVarChar, 'super_corporate_admin')
      .query(`
        INSERT INTO users (email, password, role)
        VALUES (@email, @password, @role);
        SELECT SCOPE_IDENTITY() AS id;
      `);


      const user_id = userResult.recordset[0].id;

    // ✅ Create Super Corporate Admin record
    await superCorporateAdminModel.createSuperAdmin({
      user_id,
      fullName,
      username,
      email,
      mobile,
      gender,
      profilePhoto,
      designation,
      companyName,
      corporateCode,
      department,
      officeLocation,
      access_level,
      alternateContact,
      officialEmail,
      preferredContact,
      idProof,
      corporateIdCard,
      employeeCode,
      digitalSignature,
      otp,
      twoFactor
    });

    return res.status(201).json({ msg: 'Super Corporate Admin created successfully' });

  } catch (err) {
    console.error("❌ createSuperAdmin Error:", err);
    res.status(500).json({ msg: 'Internal Server Error', error: err.message });
  }
};

// ✅ Get all Super Corporate Admins
const getSuperCorporateAdmins = async (req, res) => {
  try {
    const admins = await superCorporateAdminModel.getAllSuperCorporateAdmins();
    res.status(200).json(admins);
  } catch (err) {
    console.error("❌ getSuperCorporateAdmins Error:", err);
    res.status(500).json({ msg: 'Failed to fetch admins', error: err.message });
  }
};

module.exports = {
  createSuperAdmin,
  getSuperCorporateAdmins
};
