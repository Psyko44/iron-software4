// backend/server.js

/**
 * Fichier principal du serveur pour l'application backend, configuré avec Express.js.
 * 
 * 1. Configuration de l'environnement :
 *    - `dotenv.config()` : Charge les variables d'environnement à partir d'un fichier `.env` pour utiliser des informations sensibles comme les ports, les clés API, etc.
 * 
 * 2. Middleware :
 *    - `cors()` : Active le Cross-Origin Resource Sharing, permettant aux ressources du serveur d'être accessibles à partir d'autres domaines (utile pour les applications front-end séparées).
 *    - `express.json()` : Permet de parser les données JSON envoyées via les requêtes HTTP dans `req.body`.
 * 
 * 3. Connexion à la base de données :
 *    - `connectDB()` : Fonction appelée pour établir une connexion avec la base de données MongoDB.
 * 
 * 4. Définition des routes :
 *    - `/api/auth` : Gère toutes les routes d'authentification, comme la connexion et l'inscription des utilisateurs.
 *    - `/api/products` : Gère toutes les routes liées à la gestion des produits, telles que l'ajout, la récupération, la mise à jour et la suppression des produits.
 *    - `/api/users` : Gère les routes liées aux utilisateurs, incluant la gestion des utilisateurs (ajout, mise à jour, suppression).
 * 
 * 5. Lancement du serveur :
 *    - Le serveur écoute sur un port spécifié par `process.env.PORT` ou, à défaut, sur le port 5000 par défaut.
 *    - Le message dans la console confirme que le serveur est en marche et indique l'URL d'accès.
 */



const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users'); // Importer les routes utilisateurs

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Connecter à MongoDB
connectDB();

// Middleware
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
