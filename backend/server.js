const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Update CORS to be permissive in development, matching the same origin in production
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

const startServer = () => {
  app.listen(5000, () => console.log("Server running on port 5000"));
};

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
  retryWrites: false,
})
  .then(() => {
    console.log("MongoDB connected ?");
    startServer();
  })
  .catch(err => {
    console.error("MongoDB connection failed, continuing with fallback mode:", err.message);
    startServer();
  });

// API Routes
app.use("/api/employees", require("./routes/employee"));
app.use("/api/auth", require("./routes/auth"));

// Static File Serving (for production)
// Serve static files from the frontend-dist directory
app.use(express.static(path.join(__dirname, "frontend-dist")));

// Catch-all route to serve the React app for non-API requests (Express 5 syntax)
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend-dist", "index.html"));
});
