const { poolPromise, mssql } = require('../models/db');


const createSuperAdmin = async(data)=>
{
  const {user_id, fullName, username, email, mobile, gender,
    profilePhoto, designation, companyName, corporateCode,
    department, officeLocation, access_level, alternateContact,
    officialEmail, preferredContact, twoFactor, otp,otp_created_at,
    idProof, corporateIdCard, employeeCode, digitalSignature} = data;


const pool = await poolPromise;
const result = await pool.request()
.input('user_id', mssql.Int, user_id)
    .input('fullName', mssql.NVarChar, fullName)
    .input('username', mssql.NVarChar, username)
    .input('email', mssql.NVarChar, email)
    .input('mobile', mssql.NVarChar, mobile)
    .input('gender', mssql.NVarChar, gender)
    .input('profilePhoto', mssql.NVarChar, profilePhoto)
    .input('designation', mssql.NVarChar, designation)
    .input('companyName', mssql.NVarChar, companyName)
    .input('corporateCode', mssql.NVarChar, corporateCode)
    .input('department', mssql.NVarChar, department)
    .input('officeLocation', mssql.NVarChar, officeLocation)
    .input('access_level', mssql.NVarChar, access_level)
    .input('alternateContact', mssql.NVarChar, alternateContact)
    .input('officialEmail', mssql.NVarChar, officialEmail)
    .input('preferredContact', mssql.NVarChar, preferredContact)
    .input('twoFactor', mssql.Bit, twoFactor)
    .input('otp', mssql.NVarChar, otp)
    .input('otp_created_at', mssql.DateTime, data.otp_created_at)
    .input('idProof', mssql.NVarChar, idProof)
    .input('corporateIdCard', mssql.NVarChar, corporateIdCard)
    .input('employeeCode', mssql.NVarChar, employeeCode)
    .input('digitalSignature', mssql.NVarChar, digitalSignature)
    .query(`INSERT INTO super_corporate_admin (
              user_id, fullName, username, email, mobile, gender, profilePhoto,
              designation, companyName, corporateCode, department, officeLocation,
              access_level, alternateContact, officialEmail, preferredContact,
              twoFactor, otp, otp_created_at, idProof, corporateIdCard, employeeCode,
              digitalSignature
            )
            VALUES (
              @user_id, @fullName, @username, @email, @mobile, @gender, @profilePhoto,
              @designation, @companyName, @corporateCode, @department, @officeLocation,
              @access_level, @alternateContact, @officialEmail, @preferredContact,
              @twoFactor, @otp, GETDATE(), @idProof, @corporateIdCard, @employeeCode,
              @digitalSignature)`);

  return result.rowsAffected[0];
}


const getAllSuperCorporateAdmins = async () => {
  const pool = await poolPromise;
  const result = await pool.request()
    .query(`SELECT * FROM super_corporate_admin`);
  return result.recordset;
};

  

// Get One
const getSuperAdminById = async (id) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', mssql.Int, id)
    .query('SELECT * FROM super_corporate_admin WHERE id = @id');
  return result.recordset[0];
};

// Update
const updateSuperAdmin = async (id, data) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', mssql.Int, id)
    .input('fullName', mssql.NVarChar, data.fullName)
    .input('email', mssql.NVarChar, data.email)
    .input('mobile', mssql.NVarChar, data.mobile)
    .input('companyName', mssql.NVarChar, data.companyName)
    .query(`
      UPDATE super_corporate_admin SET
      fullName = @fullName,
      email = @email,
      mobile = @mobile,
      role = @role
      WHERE id = @id
    `);
  return result;
};

// Delete
const deleteSuperAdmin = async (id, reason) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', mssql.Int, id)
    .input('deleteReason', mssql.NVarChar, reason)
    .query(`
      DELETE FROM super_corporate_admin WHERE id = @id
    `);
  return result;
};
module.exports = {createSuperAdmin,getAllSuperCorporateAdmins,deleteSuperAdmin,updateSuperAdmin,getSuperAdminById}
