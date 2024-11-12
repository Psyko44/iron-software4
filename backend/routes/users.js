const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require('../middlewares/auth');
 // middleware pour l'authentification

module.exports = (db) => {
    // Route pour récupérer tous les utilisateurs
    router.get('/', (req, res) => {
        db.all("SELECT id, username, isAdmin FROM users", [], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
            }
            res.status(200).json(rows);
        });
    });

    // Route pour ajouter un nouvel utilisateur
    router.post('/', async (req, res) => {
        const { username, password, isAdmin } = req.body;
        try {
            // Hachage du mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertion de l'utilisateur dans la base de données
            const query = `INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)`;
            db.run(query, [username, hashedPassword, isAdmin ? 1 : 0], function(err) {
                if (err) {
                    return res.status(400).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur', details: err.message });
                }
                res.status(201).json({ message: 'Utilisateur ajouté avec succès', userId: this.lastID });
            });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur', details: error.message });
        }
    });

    // Route pour supprimer un utilisateur par ID
    router.delete('/:id', (req, res) => {
        const { id } = req.params;
        db.run("DELETE FROM users WHERE id = ?", [id], function(err) {
            if (err) {
                return res.status(400).json({ error: 'Erreur lors de la suppression de l\'utilisateur', details: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        });
    });

    // Route pour mettre à jour le statut d'admin d'un utilisateur par ID
    router.put('/update-user-admin/:id', (req, res) => {
        const { id } = req.params;
        const { isAdmin } = req.body;

        db.run("UPDATE users SET isAdmin = ? WHERE id = ?", [isAdmin ? 1 : 0, id], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', details: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json({ message: 'Statut admin mis à jour avec succès' });
        });
    });

    // Route pour obtenir les informations de l'utilisateur authentifié
    router.get('/me', auth, (req, res) => {
        const userId = req.user.id;

        db.get("SELECT id, username, isAdmin FROM users WHERE id = ?", [userId], (err, user) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erreur serveur" });
            }
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
            res.json(user);
        });
    });

    return router;
};
