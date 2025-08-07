const { poolPromise, mssql } = require('../models/db');

const createCorporateAdmin = async (data) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('fullName', mssql.NVarChar, data.fullName)
      .input('employeeId', mssql.NVarChar, data.employeeId)
      .input('designation', mssql.NVarChar, data.designation)
      .input('department', mssql.NVarChar, data.department)
      .input('contactNumber', mssql.NVarChar, data.contactNumber)
      .input('email', mssql.NVarChar, data.email)
      .input('username', mssql.NVarChar, data.username)
      .input('password', mssql.NVarChar, data.password)
      .input('role', mssql.NVarChar, 'super_corporate_admin') // Fixed value
      .input('companyName', mssql.NVarChar, data.companyName)
      .input('companyCode', mssql.NVarChar, data.companyCode)
      .input('location', mssql.NVarChar, data.location)
      .input('joiningDate', mssql.Date, data.joiningDate)
      .input('status', mssql.NVarChar, data.status)
      .input('idProof', mssql.NVarChar, data.idProof)
      .input('profilePicture', mssql.NVarChar, data.profilePicture)
      .input('authorizationLetter', mssql.NVarChar, data.authorizationLetter)
      .input('gender', mssql.NVarChar, data.gender)
      .input('dob', mssql.Date, data.dob)
      .input('permanentAddress', mssql.NVarChar, data.permanentAddress)
      .input('companyAddress', mssql.NVarChar, data.companyAddress)
      .query(`
        INSERT INTO corporate_admin (
          fullName, employeeId, designation, department, contactNumber,
          email, username, password, role, companyName, companyCode,
          location, joiningDate, status, idProof, profilePicture,
          authorizationLetter, gender, dob, permanentAddress, companyAddress
        ) VALUES (
          @fullName, @employeeId, @designation, @department, @contactNumber,
          @email, @username, @password, @role, @companyName, @companyCode,
          @location, @joiningDate, @status, @idProof, @profilePicture,
          @authorizationLetter, @gender, @dob, @permanentAddress, @companyAddress
        )
      `);

    return { success: true, rowsAffected: result.rowsAffected[0] };
  } catch (error) {
    console.error('Error inserting corporate_admin:', error);
    throw error;
  }
};



const getAllCorporateAdmins = async()=>
{
  try{
    const pool = await poolPromise;
  const result = await  pool.request().query('select id,fullname,employeeId,email,role,department,status from corporate_admin;');
  return result.recordset
  }
  catch(err){
    throw err;
  }

}

module.exports = { createCorporateAdmin,getAllCorporateAdmins};
