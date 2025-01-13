
const express = require("express");
const router = express.Router();
const admin = require("../config/firebase");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

const cookieParser = require('cookie-parser')
// const cors = require("cors")
// const cookieParser = require("cookie-parser");

const authenticateJWT = require("./../middleware/authMiddleware");
const { SignUp, logIn, LogOut } = require("../controllers/authController");

// router.use(cors());
// router.use(cookieParser());
// router.use(express.json());

router.use(cookieParser())
router.post("/signup", SignUp);

router.post("/login", logIn);

router.post("/logout", LogOut);




module.exports = router;
