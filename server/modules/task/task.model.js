const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user_id: String,
  title: String,
  subject: String,
  deadline: Date,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Task", taskSchema);
