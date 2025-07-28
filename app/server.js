const express = require('express');
require('dotenv').config(); // ✅ Load .env variables

const cors = require('cors');
const userRouter = require('./routes/userRoute');

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRouter);

// Server setup
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
const PORT = process.env.PORT || 9800;

app.listen(PORT, HOSTNAME, () => {
  console.log(`✅ Server started at http://${HOSTNAME}:${PORT}`);
});
