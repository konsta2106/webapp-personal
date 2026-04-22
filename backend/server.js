import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import fuelRoutes from "./routes/fuelRoutes.js";
import cvRoutes from "./routes/cvRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/fuel", fuelRoutes);
app.use("/api/cv", cvRoutes);
app.use("/api/contact", contactRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
