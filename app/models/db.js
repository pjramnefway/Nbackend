const mssql = require('mssql');
require('dotenv').config();

// ✅ Database configuration
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

// ✅ Create and connect the pool
const pool = new mssql.ConnectionPool(dbConfig);
const poolPromise = pool.connect(); // Connect once

// ✅ Handle connection errors
pool.on('error', (err) => {
  console.error('❌ SQL Pool Error:', err);
});

// ✅ Export
module.exports = {
  poolPromise,
  dbConfig,
  mssql,
};
