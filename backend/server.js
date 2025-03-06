import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API route (example: fetch external API data)
app.get("/api/data", async (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));