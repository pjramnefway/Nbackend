const express = require('express');
require('dotenv').config(); // ✅ Load .env variables

const cors = require('cors');
const userRouter = require('./routes/userRoute');
const path = require('path');
const fs = require('fs');


// Initialize Express app
const app = express();


// ✅ Ensure upload folders exist
const folders = [
  'uploads/corporate_id_cards',
  'uploads/digital_signatures',
  'uploads/gov_id_cards',
  'uploads/profile_photos',
];

folders.forEach((folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
});




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

// ✅ Static file serving for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Super Corporate Admin routes
const superAdminRoutes = require('./routes/superCorporateAdminRoutes');
app.use('/api', superAdminRoutes);
app.use('/api/getAll', superAdminRoutes);



// Server setup
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
const PORT = process.env.PORT || 9800;

app.listen(PORT, HOSTNAME, () => {
  console.log(`✅ Server started at http://${HOSTNAME}:${PORT}`);
});
