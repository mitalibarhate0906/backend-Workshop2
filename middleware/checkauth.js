const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { JWT_SECRET } = require("../config/auth");

exports.checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token is required",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : authHeader.trim();

    console.log("TOKEN:", token);

    const decoded = jwt.verify(token, JWT_SECRET);

    console.log("DECODED:", decoded);

    const user = await User.findById(decoded.id);

    console.log("USER:", user);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log("AUTH ERROR:", err);

    return res.status(401).json({
      message: "Invalid or expired token",
      error: err.message,
    });
  }
};