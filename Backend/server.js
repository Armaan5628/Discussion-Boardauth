const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/discussionDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);             // signup + login
app.use("/api/discussions", discussionRoutes); // discussions CRUD
app.use("/api", postRoutes);                   // posts (inside discussions)

// Root test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
