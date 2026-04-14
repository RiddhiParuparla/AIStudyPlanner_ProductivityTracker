const mongoose = require("mongoose");

const gamificationSchema = new mongoose.Schema({
  user_id: String,
  streak: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  badges: [{ type: String }],
  last_active: { type: Date }
});

module.exports = mongoose.model("Gamification", gamificationSchema);
