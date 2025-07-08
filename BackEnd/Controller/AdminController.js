require('dotenv').config();
const User = require('../Models/User');

const Admin = async () => {
    try {
        const adminExists = await User.findOne({
            $or: [
                { username: process.env.ADMIN_USERNAME },
                { email: process.env.ADMIN_EMAIL }
            ]
        });

        if (!adminExists) {
            const adminUser = new User({
                profilePicture: "https://clostore1.onrender.com/assets/images/profiles/1731732341361.jpg",
                username: process.env.ADMIN_USERNAME,
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                phone: process.env.ADMIN_PHONE,
                address: process.env.ADMIN_ADDRESS,
                role: process.env.ADMIN_ROLE,
            });
            await adminUser.save();
            console.log('Admin user created successfully.');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (err) {
        if (err.code === 11000) {
            console.error('Duplicate key error: A user with this email already exists.');
        } else {
            console.error('Error creating admin user', err);
        }
    }
};

module.exports = Admin;