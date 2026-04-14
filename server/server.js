const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes."
});
app.use("/api", apiLimiter);

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/ai-study-planner")
.then(()=> console.log("DB Connected"))
.catch(err => console.log(err));

app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/tasks", require("./modules/task/task.routes"));
app.use("/api/schedule", require("./modules/schedule/schedule.routes"));
app.use("/api/analytics", require("./modules/analytics/analytics.routes"));
app.use("/api/gamification", require("./modules/gamification/gamification.routes"));
app.use("/api/admin", require("./modules/admin/admin.routes"));
app.use("/api/ai", require("./modules/ai/ai.routes"));

app.listen(5000, () => console.log("Server running"));
