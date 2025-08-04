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
      access_level, password, confirmPassword, otp, twoFactor,
      alternateContact, officialEmail, preferredContact, employeeCode
    } = req.body;

    // ✅ Uploaded files
    const profilePhoto = req.files?.profilePhoto?.[0]?.filename || null;
    const idProof = req.files?.idProof?.[0]?.filename || null;
    const corporateIdCard = req.files?.corporateIdCard?.[0]?.filename || null;
    const digitalSignature = req.files?.digitalSignature?.[0]?.filename || null;

    //const access_level = role || 'super_admin';

    // ✅ Password validation
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    // ✅ Hash password (optional if storing in users table)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = await userModel.createUser({
      name: fullName,
      email,
      password: hashedPwd,
      role:'super_corporate_admin',
      created_by: req.user?.id || null
    });


    // Create Super Admin
    await superCorporateAdminModel.createSuperAdmin({
      user_id: newUser.id,
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
      employeeCode:req.body.employeeCode,
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
    //console.error("❌ Error in getSuperCoporateAdmin:", err);
    res.status(500).json({ msg: 'Failed to fetch admins', error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const user = await superAdminModel.getSuperAdminById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error('Fetch One Error:', err);
    res.status(500).json({ message: 'Fetch failed' });
  }
};

const update = async (req, res) => {
  try {
    await superAdminModel.updateSuperAdmin(req.params.id, req.body);
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ message: 'Update failed' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  if (!reason || !reason.trim()) {
    return res.status(400).json({ error: "Deletion reason is required." });
  }

  try {
    const pool = await poolPromise;

    // Optional: store deletion reason in a log table
    await pool.request()
      .input('user_id', sql.Int, id)
      .input('reason', sql.NVarChar(sql.MAX), reason)
      .query(`INSERT INTO deletion_logs (user_id, reason, deleted_at) VALUES (@user_id, @reason, GETDATE())`);

    // Now delete from main table
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM super_corporate_admin WHERE id = @id');

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error("Delete Error:", err);
    return res.status(500).json({ error: 'Failed to delete user' });
  }
};


module.exports = {createSuperAdmin,getSuperCorporateAdmins,getById,update,remove};


