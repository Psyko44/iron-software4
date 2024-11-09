const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users'); 

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Connexion à SQLite
const db = connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes(db));  // Passez db aux routes
app.use('/api/products', productRoutes(db)); 
app.use('/api/users', userRoutes(db)); 

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
