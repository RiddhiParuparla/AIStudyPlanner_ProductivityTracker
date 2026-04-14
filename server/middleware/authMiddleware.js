const jwt = require("jsonwebtoken");

const auth = function(req, res, next) {
  const token = req.header("Authorization");

  if(!token) return res.status(401).json("No token, authorization denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json("Token is not valid");
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json("Forbidden: Invalid Role Access");
    }
    next();
  };
};

module.exports = { auth, authorizeRoles };
