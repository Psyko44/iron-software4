/**
 * Ce fichier gère les routes liées aux utilisateurs, permettant d'effectuer des opérations CRUD (création, lecture, mise à jour, suppression)
 * ainsi que la gestion de l'accès utilisateur grâce à une route authentifiée.
 * 
 * 1. Route GET `/` :
 *    - Cette route permet de récupérer la liste complète des utilisateurs stockés dans la base de données.
 *    - En cas de succès, un tableau d'utilisateurs est renvoyé avec un statut 200.
 *    - En cas d'erreur serveur, une réponse 500 avec un message d'erreur est renvoyée.
 * 
 * 2. Route POST `/` :
 *    - Cette route permet d'ajouter un nouvel utilisateur.
 *    - Les données du nouvel utilisateur (nom d'utilisateur, mot de passe et statut admin) sont extraites du corps de la requête.
 *    - L'utilisateur est ensuite sauvegardé dans la base de données, et un message de succès est renvoyé avec un statut 201.
 *    - Si une erreur survient lors de la création, une réponse 400 avec les détails de l'erreur est renvoyée.
 * 
 * 3. Route DELETE `/:id` :
 *    - Cette route permet de supprimer un utilisateur en fonction de son `id`.
 *    - Si la suppression est réussie, un message de confirmation est renvoyé avec un statut 200.
 *    - En cas d'échec ou si l'utilisateur n'est pas trouvé, une réponse 400 est renvoyée.
 * 
 * 4. Route PUT `/update-user-admin/:id` :
 *    - Cette route permet de mettre à jour le statut `isAdmin` d'un utilisateur en fonction de son `id`.
 *    - Le nouveau statut `isAdmin` est envoyé dans le corps de la requête.
 *    - Si l'utilisateur est trouvé et mis à jour avec succès, le nouvel état de l'utilisateur est renvoyé avec un statut 200.
 *    - Si l'utilisateur n'est pas trouvé, une réponse 404 est renvoyée, sinon une erreur serveur 500 est renvoyée en cas d'échec.
 * 
 * 5. Route GET `/me` :
 *    - Cette route est protégée par une authentification (middleware `auth`). Elle permet à l'utilisateur authentifié de récupérer ses propres informations.
 *    - Le mot de passe est exclu des informations renvoyées via `select('-password')` pour des raisons de sécurité.
 *    - Si l'utilisateur n'est pas trouvé, une réponse 404 est renvoyée. En cas d'erreur serveur, une réponse 500 est envoyée.
 * 
 * Chaque route gère les erreurs potentielles et renvoie des messages explicites en fonction de la situation (erreurs de serveur, d'authentification, ou autres).
 */



const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../routes/auth');


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
});


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
    const { isAdmin } = req.body;

    try {
        
        const updatedUser = await User.findByIdAndUpdate(id, { isAdmin }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut isAdmin', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
});

router.get('/me', auth, async (req, res) => {
    try {
        
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
