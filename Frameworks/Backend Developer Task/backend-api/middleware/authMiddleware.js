// const jwt = require('jsonwebtoken');

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied' });
//   }
  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid token' });
//   }
// };

// // Middleware to check if the user is an admin
// const verifyAdmin = (req, res, next) => {
//   if (req.user?.role !== "admin") {
//     return res.status(403).json({ message: 'Access denied, admin only' });
//   }
//   next();
// };

// module.exports = { verifyToken, verifyAdmin };


const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified; // Attach user details to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};
