const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

// Route d'inscription
router.post("/leo", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

     const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: "Utilisateur déjà enregistré avec cet email !" });
    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Création du nouvel utilisateur
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error("Erreur interne :", error);
    res.status(500).send({ message: "Erreur interne du serveur" });
  }
});
module.exports = router;