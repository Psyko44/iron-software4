const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Chemin vers votre modèle User
const router = express.Router();

// Votre clé secrète pour signer les tokens
const JWT_SECRET = 'votre_clé_secrète'; // Remplacez par une clé secrète sécurisée

// Route pour l'authentification
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Cherchez l'utilisateur par son nom d'utilisateur
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        // Comparez le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Créez le token JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Répondre avec le token et les informations de l'utilisateur
        res.status(200).json({
            token: token,
            user: {
                username: user.username,
                isAdmin: user.isAdmin, // Assurez-vous que le statut admin est inclus
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});

router.post('/register', async (req, res) => {
    const { username, password, isAdmin } = req.body;
    console.log(req.body); // Ajout pour voir ce que le frontend envoie
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, isAdmin });
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur inscrit avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription', error });
    }
});

module.exports = router;
