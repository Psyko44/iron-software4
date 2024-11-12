const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = "votre_clé_secrète";

module.exports = (db) => {
  // Route de connexion
  /** router.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Erreur du serveur", error: err.message });
      }
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }

      // Vérification du mot de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      // Génération du token JWT
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({
        token: token,
        user: {
          username: user.username,
          isAdmin: user.isAdmin,
        },
      });
    });
  });
  */

  router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Injection directe dans la requête, créant une vulnérabilité SQL Injection
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    
    db.get(query, async (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Erreur du serveur", error: err.message });
        }
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // Génération du token JWT
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            token: token,
            user: {
                username: user.username,
                isAdmin: user.isAdmin,
            },
        });
    });
});

  // Route d'inscription
  router.post("/register", async (req, res) => {
    const { username, password, isAdmin } = req.body;

    try {
      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertion du nouvel utilisateur dans la base de données
      const query = `INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)`;
      db.run(query, [username, hashedPassword, isAdmin ? 1 : 0], function(err) {
        if (err) {
          return res.status(500).json({ message: "Erreur lors de l'inscription", error: err.message });
        }
        res.status(201).json({ message: "Utilisateur inscrit avec succès" });
      });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'inscription", error });
    }
  });

  return router;
};
