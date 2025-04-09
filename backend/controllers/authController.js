const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const config = require('../config/appConfig.js');
const { generateOTP, sendOTP } = require('../utils/emailUtils.js');

const otpStore = {};

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  otpStore[email] = {
    otp,
    expiresAt: Date.now() + 300000
  };

  try {
    await sendOTP(email, otp);
    res.status(200).json({ msg: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error sending OTP', error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const storedOtpData = otpStore[email];

  if (!storedOtpData) {
    return res.status(400).json({ msg: 'OTP expired or not sent' });
  }

  if (storedOtpData.expiresAt < Date.now()) {
    delete otpStore[email];
    return res.status(400).json({ msg: 'OTP has expired' });
  }

  if (storedOtpData.otp !== otp) {
    return res.status(400).json({ msg: 'Invalid OTP' });
  }

  otpStore[email].verified = true;
  res.status(200).json({ msg: 'OTP verified successfully' });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    const storedOtpData = otpStore[email];
    if (!storedOtpData || !storedOtpData.verified) {
      return res.status(400).json({ msg: 'Please verify OTP before signing up' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    delete otpStore[email];

    res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === 11000) {
      res.status(400).json({ msg: 'Email already in use' });
    } else {
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid email or password' });
      }
  
      const otp = generateOTP();
      otpStore[email] = {
        otp,
        expiresAt: Date.now() + 300000
      };
      await sendOTP(email, otp);
  
      res.status(200).json({ msg: 'Credentials verified. OTP sent for login.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  };

  exports.verifyLoginOTP = async (req, res) => {
    const { email, otp } = req.body;
    const storedOtpData = otpStore[email];
  
    if (!storedOtpData) {
      return res.status(400).json({ msg: 'OTP expired or not sent' });
    }
  
    if (storedOtpData.expiresAt < Date.now()) {
      delete otpStore[email];
      return res.status(400).json({ msg: 'OTP has expired' });
    }
  
    if (storedOtpData.otp !== otp) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }
  
    delete otpStore[email];
  
    // Find user and create JWT token
    const user = await User.findOne({ email });
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
  
    res.status(200).json({ 
      msg: 'Login successful', 
      token, 
      userId: user._id,
      username: user.name
    });
  };


  exports.logout = (req, res) => {
    // In a stateless JWT system, we don't need to do anything server-side for logout
    res.status(200).json({ msg: 'Logout successful' });
  };




