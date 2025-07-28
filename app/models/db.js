const mssql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// ✅ Use a named async function for better debugging and structure
const poolPromise = (async () => {
  try {
    const pool = await mssql.connect(dbConfig);
    console.log('✅ Connected to MSSQL');
    return pool;
  } catch (err) {
    console.error('❌ MSSQL Connection Error:', err);
    throw err;
  }
})();

module.exports = { poolPromise, dbConfig, mssql };
