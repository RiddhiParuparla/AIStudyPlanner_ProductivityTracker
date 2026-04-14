const Analytics = require("../analytics/analytics.model");
const Gamification = require("../gamification/gamification.model");

exports.getChatResponse = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;

  const stats = await Analytics.find({ user_id: userId });
  const gState = await Gamification.findOne({ user_id: userId });

  let response = "I'm here to help you study! Ask me about your productivity.";

  const msg = message.toLowerCase();

  if (msg.includes("productive") || msg.includes("how am i doing")) {
    const totalTime = stats.reduce((acc, curr) => acc + curr.study_time, 0);
    if (totalTime > 500) {
      response = `You're doing great! You've studied for ${totalTime} minutes and you're at Level ${gState?.level || 1}. Keep it up!`;
    } else {
      response = `You're just getting started! You've logged ${totalTime} minutes. Let's aim for a legacy of focus today!`;
    }
  } else if (msg.includes("streak")) {
    response = `You currently have a 🔥 ${gState?.streak || 0} day streak! Don't let it break!`;
  } else if (msg.includes("study today") || msg.includes("what should i")) {
    response = "Check your AI Planner! I've already sorted your tasks by deadline and difficulty to maximize your impact.";
  }

  res.json({ response });
};

exports.getSmartInsights = async (req, res) => {
  const stats = await Analytics.find({ user_id: req.user.id });
  
  if (stats.length === 0) {
    return res.json({ insight: "Add some study sessions to see smart insights!" });
  }

  // Simple heuristic: check if sessions are usually early or late
  const hours = stats.map(s => new Date(s.date).getHours());
  const avgHour = hours.reduce((a, b) => a + b, 0) / hours.length;

  let timeOfDay = avgHour < 12 ? "morning" : (avgHour < 18 ? "afternoon" : "evening");
  
  const totalTasks = stats.reduce((acc, curr) => acc + (curr.completed_tasks || 0), 0);

  res.json({
    insight: `You are most productive in the ${timeOfDay}. You've conquered ${totalTasks} tasks so far!`,
    productivityTrend: stats.length > 5 ? "Upwards" : "Calculating..."
  });
};
