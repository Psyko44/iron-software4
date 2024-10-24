
/**
 * Ce fichier gère les routes liées aux produits, permettant d'ajouter, récupérer, mettre à jour et supprimer des produits dans la base de données.
 * 
 * 1. Route POST `/` :
 *    - Cette route permet d'ajouter un nouveau produit.
 *    - Elle récupère le dernier produit ajouté en utilisant `Product.findOne().sort({ productId: -1 })` pour déterminer le dernier `productId`.
 *    - Si un produit existe, le nouvel identifiant de produit sera `lastProduct.productId + 1`, sinon il sera défini à 1.
 *    - Un nouveau produit est ensuite créé avec les informations fournies (`name`, `description`, `price`, `imageUrl`) et sauvegardé dans la base de données.
 *    - En cas de succès, la réponse renvoie un message et le produit ajouté. En cas d'échec, une erreur 400 est renvoyée.
 * 
 * 2. Route GET `/` :
 *    - Cette route permet de récupérer tous les produits de la base de données.
 *    - Si la récupération est réussie, elle renvoie un tableau contenant tous les produits avec un code de statut 200.
 *    - En cas d'erreur (problème serveur), une réponse avec un code de statut 500 et les détails de l'erreur est envoyée.
 * 
 * 3. Route GET `/:id` :
 *    - Cette route permet de récupérer un produit spécifique en fonction de son `productId` passé dans l'URL.
 *    - Si le produit n'existe pas, une réponse 404 est renvoyée avec un message "Produit non trouvé".
 *    - En cas de succès, le produit est renvoyé, ou en cas d'erreur serveur, une erreur 500 avec les détails est envoyée.
 * 
 * 4. Route DELETE `/:id` :
 *    - Cette route permet de supprimer un produit en fonction de son `productId`.
 *    - Si le produit est supprimé avec succès, une réponse 200 est envoyée avec un message de succès.
 *    - Si le produit n'est pas trouvé, une réponse 404 est renvoyée.
 *    - En cas d'erreur durant la suppression, une réponse 400 est envoyée avec les détails de l'erreur.
 * 
 * 5. Route PUT `/:id` :
 *    - Cette route permet de mettre à jour un produit en fonction de son `productId`.
 *    - Elle accepte les informations mises à jour pour le nom, la description, le prix et l'URL de l'image du produit.
 *    - Si le produit est trouvé et mis à jour, il est renvoyé avec un statut 200.
 *    - Si le produit n'est pas trouvé, une réponse 404 est renvoyée.
 *    - En cas d'erreur serveur lors de la mise à jour, une erreur 500 est renvoyée avec les détails de l'erreur.
 */


const express = require('express');
const Product = require('../models/Product');

const router = express.Router();


router.post('/', async (req, res) => {
    const { name, description, price, imageUrl } = req.body;

    try {
        
        const lastProduct = await Product.findOne().sort({ productId: -1 });

        const newProductId = lastProduct ? lastProduct.productId + 1 : 1;

        const newProduct = new Product({
            productId: newProductId,
            name,
            description,
            price,
            imageUrl
        });

        await newProduct.save();
        res.status(201).json({ message: 'Produit ajouté avec succès', product: newProduct });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de l\'ajout du produit', details: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des produits', details: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.id }); 
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', details: error });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findOneAndDelete({ productId: id });
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la suppression du produit', details: error });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, imageUrl } = req.body;

    try {
        const updatedProduct = await Product.findOneAndUpdate({ productId: id }, 
            { name, description, price, imageUrl }, 
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du produit', details: error });
    }
});

module.exports = router;
