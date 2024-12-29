const express = require('express');
const connectDB = require('./Config/DataBase');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Admin = require('./Controller/AdminController');
const session = require('express-session');
const admin = require('firebase-admin');
const serviceAccount = require('./Auth.json'); 

// Load env vars
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Init Middleware
app.use(express.json({ extended: false }));

// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

Admin();

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'FrontEnd', 'src', 'assets', 'images', 'profiles');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Handle multer errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: 'File upload error', error: err.message });
  } else if (err) {
    return res.status(400).json({ message: 'Something went wrong', error: err.message });
  }
  next();
});

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});

// Serve static files from the "assets" directory
app.use('/assets', express.static(path.join(__dirname, '..', 'FrontEnd', 'src', 'assets')));

// Define Routes
app.use('/api/auth', require('./Router/userRoutes'));
app.use('/api/products', require('./Router/productRoutes')(upload));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Firebase Admin Initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.MONGO_URI 
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started`));