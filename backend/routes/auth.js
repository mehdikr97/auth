const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const Joi = require("joi");
const isAuthenticated = require("../midlwears/middler");

const router = express.Router();

// Login
router.post("/add", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ message: "Email ou mot de passe invalide" });
  }

  const token = user.generateAuthToken();
  res.status(200).json({ data: token, message: "Connexion réussie" });
});

const validateLogin = (data) => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(data);
};

// Route protégée
router.get('/login', (req, res) => {
  req.session.userId = 123;  
  res.send('Utilisateur connecté');
});
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {  // Détruire la session
    if (err) {
      return res.status(500).send('Erreur de déconnexion');
    }
    res.send('Utilisateur déconnecté');
  });
});

module.exports = router;
