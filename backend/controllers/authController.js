const User = require("../models/User");
const admin = require("../config/firebase");
const jwt = require("jsonwebtoken");

// Register User - Using Mongoose
const Register = async (req, res) => {
  const { phone, fullname } = req.body;

  try {
    const newUser = new User({
      phone,
      fullname,
    });

    await newUser.save();

    res.status(201).json({
      message: `New user added with ID: ${newUser._id}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err.message });
  }
};

// SignUp - Using Firebase for Authentication and Mongoose for DB
const SignUp = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, uid } = decodedToken;

    // Check if the user already exists
    const existingUser = await User.findOne({ firebase_uid: uid });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Add new user to MongoDB
    const newUser = new User({
      email,
      firebase_uid: uid,
    });

    await newUser.save();

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID token", error: err.message });
  }
};

// LogIn - Using Firebase Authentication and JWT Token
const logIn = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, uid } = decodedToken;

    // Check if user exists in MongoDB
    const user = await User.findOne({ firebase_uid: uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create JWT token
    const jwtToken = jwt.sign({ uid, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set JWT token in cookies
    res.cookie("jwtToken", jwtToken, { httpOnly: true, maxAge: 900000 });

    res.json({ jwtToken });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID token", error: err.message });
  }
};

// LogOut - Clear Token
const LogOut = async (req, res) => {
  res.clearCookie("jwtToken", { httpOnly: true, secure: false });
  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  Register,
  SignUp,
  logIn,
  LogOut,
};
