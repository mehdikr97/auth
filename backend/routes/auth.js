const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  try {
    // Validation des données envoyées
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Vérification de l'existence de l'utilisateur
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("Utilisateur non trouvé :", req.body.email);
      return res.status(401).send({ message: "Email ou mot de passe invalide" });
    }

    // Vérification du mot de passe
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      console.log("Mot de passe incorrect pour :", req.body.email);
      return res.status(401).send({ message: "Email ou mot de passe invalide" });
    }

    // Génération du token
    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Connexion réussie" });
  } catch (error) {
    console.error("Erreur interne :", error);
    res.status(500).send({ message: "Erreur interne du serveur" });
  }
});

// Validation avec Joi
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Mot de passe"), // Assurez-vous que le mot de passe est suffisamment complexe
  });
  return schema.validate(data);
};

module.exports = router;