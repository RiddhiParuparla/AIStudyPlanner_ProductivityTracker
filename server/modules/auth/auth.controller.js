const User = require("./auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { logAction } = require("../admin/admin.controller");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  await logAction(user._id, "User registered an account");

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json("Invalid credentials");
  if (user.isActive === false) return res.status(403).json("Account disabled by Admin");

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  
  await logAction(user._id, "User logged in natively");

  res.json({ token, name: user.name, role: user.role });
};
