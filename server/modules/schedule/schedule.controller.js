const axios = require("axios");
const Task = require("../task/task.model");

exports.generateSchedule = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user.id });

    const formatted = tasks.map(t => ({
      title: t.title,
      deadline: t.deadline ? Math.ceil((new Date(t.deadline) - new Date()) / (1000*60*60*24)) : 7,
      difficulty: 3, // mock for now
      duration: 2    // mock for now
    }));

    const response = await axios.post("http://127.0.0.1:8000/generate", {
      tasks: formatted,
      daily_hours: 6
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "AI Service Error" });
  }
};
