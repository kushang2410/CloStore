const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const admin = require('firebase-admin');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { username, email, password, role, phone, address } = req.body;
  const profilePicture = req.file ? `/assets/images/profiles/${req.file.filename}` : null;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password,
      role: role || 'user',
      phone,
      address,
      profilePicture,
      registrationTime: new Date(),
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get user details
// @route   GET /api/users/user
// @access  Private
exports.getUserDetails = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// @desc    Update user profile picture
// @route   POST /api/auth/update-profile-picture
// @access  Private
exports.updateProfilePicture = async (req, res) => {
  console.log('Update profile picture route hit');
  const { userId } = req.user;
  const profilePicture = req.file ? `/assets/images/profiles/${req.file.filename}` : null;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.profilePicture = profilePicture;
    await user.save();

    res.json({ msg: 'Profile picture updated successfully', profilePicture });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update user details
// @route   PUT /api/auth/update-user
// @access  Private
exports.updateUser = async (req, res) => {
  console.log('Update user route hit');
  try {
    const userId = req.body.userId; 
    const { role, ...updateData } = req.body; 

    if (role && req.user.role !== 'mainAdmin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { role, ...updateData }, { new: true }).select('-password');

    if (!updatedUser) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User updated successfully');
    res.json(updatedUser);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Remove user
// @route   DELETE /api/auth/remove-user
// @access  Private
exports.removeUser = async (req, res) => {
  try {
    const userId = req.body.userId; 

    if (req.user.role !== 'mainAdmin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const removedUser = await User.findByIdAndDelete(userId);

    if (!removedUser) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User removed successfully');
    res.json({ message: 'User removed successfully' });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllUsers = async (req, res) => {
  if (req.user.role !== 'mainAdmin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Database access error' });
  }
};

let OTP = null;

const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

exports.resetPassword = (req, res) => {
  const email = req.body.email;
  OTP = generateOTP();
  console.log(`Generated OTP: ${OTP} for email: ${email}`);

  const transporter = nodemailer.createTransport({
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
      user: 'kushangtanawala@gmail.com',
      pass: 'bmwg dyfv jqyx sjkm'
    },
  });

  const mailOptions = {
    from: 'kushangtanawala@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Your OTP for password reset is: <h1>${OTP}</h1></p>`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error occurred while sending email:', err);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Password reset email sent');
    }
  });
};

exports.verifyOTP = (req, res) => {
  const { otp } = req.body;
  console.log(`Received OTP: ${otp}, Expected OTP: ${OTP}`);
  if (otp == OTP) {
    res.send("OTP Verified");
  } else {
    res.send("OTP Not Verified");
  }
};

exports.changePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  
  if (!OTP) {
    return res.status(400).send('OTP not verified or expired');
  }

  if (!email || !newPassword) {
    return res.status(400).send('Email and new password are required');
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword; 
    
    await user.save();
    OTP = null; // Reset the OTP

    res.status(200).send('Password changed successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Google Authentication
// @route   POST /api/users/google-auth
// @access  Public
exports.googleAuth = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;

    let user = await User.findOne({ email: email });
    if (!user) {
      user = new User({
        firebaseId: uid,
        email: email,
        username: decodedToken.name,
        profilePicture: decodedToken.picture,
        password: crypto.randomBytes(16).toString('hex')
      });
      await user.save();
    }

    res.json({ success: true, message: 'User authenticated successfully', user });
  } catch (error) {
    console.error('Error in Firebase Google Auth:', error);
    res.status(500).json({ success: false, message: 'Authentication failed' });
  }
};