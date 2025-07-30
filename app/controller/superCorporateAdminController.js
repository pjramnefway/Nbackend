const userModel = require('../models/userModel');
const superCorporateAdminModel = require('../models/superCorporateAdminModel');
const bcrypt = require('bcrypt');

const createSuperAdmin = async (req, res) => {
  try {
    const {
      fullName, username, email, mobile, gender, designation,
      companyName, corporateCode, department, officeLocation,
      role, password, confirmPassword, otp, twoFactor,
      alternateContact, officialEmail, preferredContact, employeeCode
    } = req.body;

    // Files
    const profilePhoto = req.files?.profilePhoto?.[0]?.filename || null;
    const idProof = req.files?.idProof?.[0]?.filename || null;
    const corporateIdCard = req.files?.corporateIdCard?.[0]?.filename || null;
    const digitalSignature = req.files?.digitalSignature?.[0]?.filename || null;

    // Password check
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create User
    const newUser = await userModel.createUser({
      name: fullName,
      email,
      password: hashedPwd,
      role,
      created_by: req.user?.id || null
    });

    console.log("✅ New User Created:", newUser);

    // Create Super Admin
    await superCorporateAdminModel.createSuperCoporateAdmin({
      user_id: newUser.id,
      fullName,
      username,
      mobile,
      gender,
      profilePhoto,
      designation,
      companyName,
      corporateCode,
      department,
      officeLocation,
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

    return res.status(201).json({ msg: 'Super Corporate Admin Added Successfully' });

  } catch (err) {
    console.error("❌ Error in createSuperAdmin:", err);
    res.status(500).json({ msg: `Internal Server Error`, error: err.message });
  }
};


const getSuperCoporateAdmin = async (req, res) => {
  try {
    const admins = await superCorporateAdminModel.getAllSuperAdmins();
    res.status(200).json(admins);
  } catch (err) {
    console.error("❌ Error in getSuperCoporateAdmin:", err);
    res.status(500).json({ msg: 'Failed to fetch admins', error: err.message });
  }
};



module.exports = {createSuperAdmin,getSuperCoporateAdmin};


