/**
 * Ce fichier définit un modèle de produit pour MongoDB en utilisant Mongoose.
 * 
 * Explication détaillée :
 * 1. `mongoose`: On importe la bibliothèque Mongoose, qui est un outil utilisé pour interagir avec MongoDB, 
 *    en créant des schémas et des modèles pour structurer les données dans une base de données NoSQL.
 * 
 * 2. `productSchema`: C'est le schéma du produit, qui définit la structure des documents dans la collection "Product".
 *    - `productId`: C'est un identifiant unique de type Number pour chaque produit, il est requis et doit être unique.
 *    - `name`: Nom du produit de type String, il est également requis.
 *    - `description`: Description du produit, de type String, requise pour fournir des détails sur le produit.
 *    - `price`: Prix du produit, de type Number, il est nécessaire.
 *    - `imageUrl`: URL de l'image du produit, de type String, mais optionnel (pas requis).
 * 
 * 3. `Product`: Le modèle est ensuite créé en associant le schéma à la collection "Product" dans MongoDB. 
 *    Il permet de créer, lire, mettre à jour et supprimer des documents en respectant la structure définie par `productSchema`.
 * 
 * 4. `module.exports`: Cette ligne permet d'exporter le modèle `Product` pour qu'il puisse être utilisé dans d'autres fichiers.
 * 
 * En résumé, ce code structure les produits d'une base de données MongoDB, avec des champs pour l'identifiant, le nom, 
 * la description, le prix et une image optionnelle.
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: {
        type: Number, 
        required: true,
        unique: true, 
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
