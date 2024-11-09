const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Chemin du fichier de la base de données SQLite
const dbPath = path.resolve(__dirname, 'database.db');

// Connexion et initialisation de la base de données
const connectDB = () => {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Erreur de connexion à SQLite:', err.message);
            process.exit(1);
        }
        console.log('SQLite connecté !');
    });

    // Création des tables si elles n'existent pas
    db.serialize(() => {
        // Table pour les utilisateurs (authentification et gestion des utilisateurs)
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT,
                isAdmin INTEGER DEFAULT 0
            )
        `);

        // Table pour les produits
        db.run(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                image TEXT,
                description TEXT
            )
        `);

        // Table pour gérer les sessions ou les tokens si nécessaire (optionnel)
        db.run(`
            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                token TEXT,
                expiry DATE,
                FOREIGN KEY(userId) REFERENCES users(id)
            )
        `);
    });

    return db;
};

module.exports = connectDB;
