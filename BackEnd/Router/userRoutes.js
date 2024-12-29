const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const { authenticateJWT } = require('../Middleware/auth');
const authMiddleware = require('../Middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', '..', 'FrontEnd', 'src', 'assets', 'images', 'profiles');
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

// Existing routes
router.post('/register', upload.single('profilePicture'), userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgot-password', userController.resetPassword);
router.post('/verify-otp', userController.verifyOTP);
router.post('/change-password', userController.changePassword);
router.get('/user', userController.getUserDetails);
router.post('/google-auth', userController.googleAuth);
router.post('/update-profile-picture', authenticateJWT, upload.single('profilePicture'), userController.updateProfilePicture);

// route for fetching all users
router.get('/all-users', authMiddleware, userController.getAllUsers);

// route for updating user data
router.put('/update-user', authMiddleware, userController.updateUser);

// route for removing user
router.delete('/remove-user', authMiddleware, userController.removeUser);

// Example protected route
router.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;