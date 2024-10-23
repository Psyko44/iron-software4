const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../routes/auth');

// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
});

// Ajouter un utilisateur
router.post('/', async (req, res) => {
    const { username, password, isAdmin } = req.body;
    try {
        const newUser = new User({ username, password, isAdmin });
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur', details: error });
    }
});

// Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la suppression de l\'utilisateur', details: error });
    }
});


router.put('/update-user-admin/:id', async (req, res) => {
    const { id } = req.params;
    const { isAdmin } = req.body; // On récupère la nouvelle valeur de isAdmin

    try {
        // Mettre à jour l'utilisateur avec le nouveau statut isAdmin
        const updatedUser = await User.findByIdAndUpdate(id, { isAdmin }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Répondre avec l'utilisateur mis à jour
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut isAdmin', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
});

router.get('/me', auth, async (req, res) => {
    try {
        // req.user devrait être défini par le middleware d'authentification
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});



module.exports = router;
