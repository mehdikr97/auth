
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Configuration des sessions
app.use(
  session({
    secret: process.env.JWT_SECRET || "secret", 
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict",
    },
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Connexion à MongoDB
mongoose
  .connect( "mongodb://127.0.0.1:27017/authdb")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Failed to connect to MongoDB:", err.message));

// Lancer le serveur
const PORT = process.env.PORT || 7800;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
