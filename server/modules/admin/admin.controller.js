const User = require("../auth/auth.model");
const Analytics = require("../analytics/analytics.model");
const Log = require("./log.model");

// Exportable reusable logging middleware function
exports.logAction = async (user_id, action) => {
  try {
    await Log.create({ user_id, action });
  } catch (err) {
    console.error("Log trace failed", err);
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  exports.logAction(req.user.id, `Admin deleted user ${req.params.id}`);
  res.json("User deleted");
};

exports.toggleUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isActive = user.isActive === undefined ? false : !user.isActive;
  await user.save();
  exports.logAction(req.user.id, `Admin toggled user ${user.email} isActive: ${user.isActive}`);
  res.json(user);
};

exports.getSystemStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: { $ne: false } }); // Accommodate legacy users missing key
  const logs = await Analytics.find();

  const totalStudy = logs.reduce((sum, item) => sum + (item.study_time || 0), 0);
  const totalFocus = logs.reduce((sum, item) => sum + (item.focus_score || 0), 0);
  const avgFocusScore = logs.length ? Math.floor(totalFocus / logs.length) : 0;

  const getLogs = await Log.find().sort({ timestamp: -1 }).limit(50); // Get recent audit trace

  res.json({ totalUsers, activeUsers, totalStudy, avgFocusScore, activity: getLogs });
};
