const { poolPromise, mssql } = require('./db');

// ✅ Corrected createUser function
const createUser = async ({ name, email, password, role, created_by }) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('name', mssql.NVarChar(100), name)
    .input('email', mssql.NVarChar(255), email)
    .input('password', mssql.NVarChar(255), password)
    .input('role', mssql.NVarChar(50), role)
    .input('created_by', mssql.Int, created_by) 
    .query(`
      INSERT INTO users (name, email, password, role, created_by)
      OUTPUT INSERTED.id
      VALUES (@name, @email, @password, @role, @created_by)
    `);

  return result.recordset[0];
};

// ✅ getUserByEmail function
const getUserByEmail = async (email) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', mssql.NVarChar(255), email)
      .query(`SELECT * FROM users WHERE email = @email`);

    return result.recordset[0]; // return user object if found
  } catch (err) {
    console.error('getUserByEmail Error:', err);
    throw err;
  }
};

module.exports = { createUser, getUserByEmail };
