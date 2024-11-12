const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // POST - Ajouter un nouveau produit
    router.post('/', (req, res) => {
        const { name, description, price, image } = req.body;

        // Insérer le nouveau produit dans la base de données
        const query = `INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)`;
        db.run(query, [name, description, price, image], function(err) {
            if (err) {
                console.error('Erreur lors de l\'ajout du produit:', err);
                return res.status(500).json({ error: 'Erreur lors de l\'ajout du produit', details: err.message });
            }
            res.status(201).json({ message: 'Produit ajouté avec succès', product: { id: this.lastID, name, description, price, image } });
        });
    });

    // GET - Récupérer tous les produits
    router.get('/', (req, res) => {
        db.all("SELECT * FROM products", [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur lors de la récupération des produits', details: err.message });
            }
            res.status(200).json(rows);
        });
    });

    // GET - Récupérer un produit par ID
    router.get('/:id', (req, res) => {
        const id = req.params.id;
        db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur lors de la récupération du produit', details: err.message });
            }
            if (!row) {
                return res.status(404).json({ message: 'Produit non trouvé' });
            }
            res.json(row);
        });
    });

    // DELETE - Supprimer un produit par ID
    router.delete('/:id', (req, res) => {
        const id = req.params.id;
        db.run("DELETE FROM products WHERE id = ?", [id], function(err) {
            if (err) {
                return res.status(400).json({ error: 'Erreur lors de la suppression du produit', details: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Produit non trouvé' });
            }
            res.status(200).json({ message: 'Produit supprimé avec succès' });
        });
    });

    // PUT - Mettre à jour un produit par ID
    router.put('/:id', (req, res) => {
        const id = req.params.id;
        const { name, description, price, image } = req.body;

        db.run(
            "UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?",
            [name, description, price, image, id],
            function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Erreur lors de la mise à jour du produit', details: err.message });
                }
                if (this.changes === 0) {
                    return res.status(404).json({ message: 'Produit non trouvé' });
                }
                res.status(200).json({ message: 'Produit mis à jour avec succès', product: { id, name, description, price, image } });
            }
        );
    });

    return router;
};
