// routes/auth.js

const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user"); // Assure-toi d'importer ton modèle User
const Joi = require("joi");

const router = express.Router();

// Route d'enregistrement (register)
router.post("/leo", async (req, res) => {
  try {
    // Validation des données d'entrée
    const { error } = validateRegistration(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Vérification de l'existence de l'utilisateur
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(400).send({ message: "Email déjà utilisé" });

    // Création de l'utilisateur
    const newUser = new User({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    await newUser.save();
    res.status(201).send({ message: "Utilisateur créé avec succès !" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erreur interne du serveur" });
  }
});

// Validation des données pour l'enregistrement
const validateRegistration = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Mot de passe"),
    firstName: Joi.string().required().label("Prénom"),
    lastName: Joi.string().required().label("Nom de famille"),
  });
  return schema.validate(data);
};

module.exports = router;
