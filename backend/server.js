const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Importer les routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Gestion des fichiers statiques

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Connexion à MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/authdb')
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Failed to connect to MongoDB:", err.message));

// Lancer le serveur
const PORT =  7800;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});