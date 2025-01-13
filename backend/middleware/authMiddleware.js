const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.jwtToken;





  // if (!token) {
  //   return res.status(403).json({ message: "Authentication token required" });
  // }

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = decoded;
  //   next();
  // } catch (err) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }
};

module.exports = authenticateJWT;
