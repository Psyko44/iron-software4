
/**
 * Ce fichier gère les routes pour l'authentification des utilisateurs, incluant la connexion et l'inscription.
 * 
 * 1. `JWT_SECRET`: C'est une clé secrète utilisée pour signer les tokens JWT (JSON Web Token). Elle permet de sécuriser 
 *    la génération des tokens d'authentification.
 * 
 * 2. Route POST `/login`: 
 *    - Cette route permet aux utilisateurs de se connecter.
 *    - Elle vérifie d'abord si l'utilisateur existe dans la base de données en recherchant par nom d'utilisateur (`username`).
 *    - Si l'utilisateur est trouvé, le mot de passe envoyé est comparé au mot de passe stocké (haché) dans la base de données en utilisant `bcrypt`.
 *    - Si la comparaison est correcte, un token JWT est généré avec l'ID de l'utilisateur et une durée d'expiration d'une heure.
 *    - La réponse inclut le token et quelques informations sur l'utilisateur, comme le nom d'utilisateur et le statut admin.
 * 
 * 3. Route POST `/register`: 
 *    - Cette route permet à un utilisateur de s'inscrire.
 *    - Le mot de passe est d'abord haché (crypté) avant d'être sauvegardé dans la base de données.
 *    - Un nouvel utilisateur est ensuite créé avec les informations fournies (nom d'utilisateur, mot de passe haché, statut admin).
 *    - Si l'inscription réussit, un message de succès est retourné, sinon une erreur est envoyée.
 * 
 * 4. Gestion des erreurs : 
 *    - Chaque route gère les erreurs potentiellement rencontrées (comme un problème de serveur ou une information incorrecte) en 
 *      renvoyant une réponse appropriée avec un code de statut HTTP adapté (par exemple, 401 pour non autorisé, 500 pour une erreur serveur).
 */


const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const JWT_SECRET = "votre_clé_secrète";
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      token: token,
      user: {
        username: user.username,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

router.post("/register", async (req, res) => {
  const { username, password, isAdmin } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, isAdmin });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur inscrit avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription", error });
  }
});

module.exports = router;
