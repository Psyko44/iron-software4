const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Ajouter un produit
router.post('/', async (req, res) => {
    const { name, description, price, imageUrl } = req.body;

    try {
        const newProduct = new Product({ name, description, price, imageUrl });
        await newProduct.save();
        res.status(201).json({ message: 'Produit ajouté avec succès' });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de l\'ajout du produit', details: error });
    }
});

// Obtenir tous les produits
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des produits', details: error });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du produit', details: error });
    }
});

// Supprimer un produit
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la suppression du produit', details: error });
    }
});

// Mettre à jour un produit (facultatif, si nécessaire)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, imageUrl } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, imageUrl }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du produit', details: error });
    }
});

module.exports = router;
