const {poolPromise,mssql} = require('./db');

const createSuperCoporateAdmin = async(data)=>
{
    const pool = await poolPromise;
    const request =  await pool.request();
        // bind all fields here
    request.input('user_id', mssql.Int, data.user_id);
    request.input('fullName', mssql.NVarChar, data.fullName);
    request.input('username', mssql.NVarChar, data.username);
    request.input('mobile', mssql.NVarChar, data.mobile);
    request.input('gender', mssql.NVarChar, data.gender);
    request.input('profilePhoto', mssql.NVarChar, data.profilePhoto);
    request.input('designation', mssql.NVarChar, data.designation);
    request.input('companyName', mssql.NVarChar, data.companyName);
    request.input('corporateCode', mssql.NVarChar, data.corporateCode);
    request.input('department', mssql.NVarChar, data.department);
    request.input('officeLocation', mssql.NVarChar, data.officeLocation);
    request.input('alternateContact', mssql.NVarChar, data.alternateContact);
    request.input('officialEmail', mssql.NVarChar, data.officialEmail);
    request.input('preferredContact', mssql.NVarChar, data.preferredContact);
    request.input('idProof', mssql.NVarChar, data.idProof);
    request.input('corporateIdCard', mssql.NVarChar, data.corporateIdCard);
    request.input('employeeCode', mssql.NVarChar, data.employeeCode);
    request.input('digitalSignature', mssql.NVarChar, data.digitalSignature);
    request.input('otp', mssql.NVarChar, data.otp);
    request.input('twoFactor', mssql.Bit, data.twoFactor);

    await request.query(`
      INSERT INTO super_corporate_admin (
        user_id, fullName, username, mobile, gender, profilePhoto, designation,
        companyName, corporateCode, department, officeLocation,
        alternateContact, officialEmail, preferredContact,
        idProof, corporateIdCard, employeeCode, digitalSignature, otp, twoFactor
      ) VALUES (
        @user_id, @fullName, @username, @mobile, @gender, @profilePhoto, @designation,
        @companyName, @corporateCode, @department, @officeLocation,
        @alternateContact, @officialEmail, @preferredContact,
        @idProof, @corporateIdCard, @employeeCode, @digitalSignature, @otp, @twoFactor
      )
    `);
}

const getAllSuperAdmins = async()=>
{
  const pool = await poolPromise;
  const result = await pool.request().query(`  SELECT 
      u.id, u.email, u.role, u.created_by,
      s.fullName, s.username, s.mobile, s.designation, s.companyName, s.department,
      s.officialEmail, s.employeeCode, s.gender, s.profilePhoto, s.idProof, s.digitalSignature
    FROM users u
    JOIN super_corporate_admin s ON u.id = s.user_id`)
      return result.recordset
}



module.exports = {createSuperCoporateAdmin,getAllSuperAdmins}

