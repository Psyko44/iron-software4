const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configurez le stockage avec multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier où les fichiers seront enregistrés
    },
    filename: (req, file, cb) => {
        // Utilisez le nom original du fichier
        cb(null, file.originalname); 
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|php/; // Autorise les images et les fichiers .php (pour la démonstration de sécurité)
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        } else {
            cb('Erreur: Extensions de fichier non supportées !');
        }
    },
});

// Route pour l'upload de fichier
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Veuillez sélectionner un fichier.' });
    }
    res.json({ message: 'Fichier téléchargé avec succès.', file: req.file });
});

module.exports = router;
