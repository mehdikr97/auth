const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Token manquant" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token invalide" });
  }
}

module.exports = isAuthenticated;
