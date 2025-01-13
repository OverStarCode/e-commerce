
const DbConnection = require("../config/db_connect");
const db = require("../config/db");
const admin = require("../config/firebase");
const jwt = require("jsonwebtoken");

const Register = async  (req, res) => {
    const db = DbConnection();

    const { phone, fullname } = req.body;

    db.query(
      "INSERT INTO users (phone, fullname) VALUES (?,?)",
      [phone, fullname],
      (err, result) => {
        if (err) throw err;
        res.send(`<h1>New user added with ID: ${result.insertId}</h1>`);
      }
    );
}

const SignUp = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, uid } = decodedToken;

    // Check if user already exists
    db.query("SELECT * FROM users WHERE firebase_uid = ?", [uid], (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Add new user to database
      db.query("INSERT INTO users (email, firebase_uid) VALUES (?, ?)", [email, uid], (err) => {
        if (err) throw err;
        res.json({ message: "Signup successful" });
      });
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID token" });
  }
}
const logIn = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, uid } = decodedToken;

    // Check if user exists in database
    db.query("SELECT * FROM users WHERE firebase_uid = ?", [uid], (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Create JWT token
      const jwtToken = jwt.sign({ uid, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Set cookie
      res.cookie("jwtToken", jwtToken, { httpOnly: true ,maxAge: 900000})
      res.json({ jwtToken });
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID token" });
  }
}

const LogOut = async(req, res) => {
  // Clear the token cookie
  res.clearCookie("token", { httpOnly: true, secure: false });
  res.status(200).json({ message: "Logout successful" });
}
module.exports = {
  Register,
  SignUp,
  logIn,
  LogOut,
};