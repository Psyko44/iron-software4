/**
 * Composant `Products` qui affiche la liste des produits disponibles.
 * 
 * 1. États locaux (`useState`) :
 *    - `products` : État qui stocke la liste des produits récupérés depuis l'API. Initialement, il est vide.
 * 
 * 2. Fonction `fetchProducts` :
 *    - Fonction asynchrone qui récupère la liste des produits depuis l'API (`/api/products`).
 *    - Elle utilise `fetch` pour envoyer une requête GET à l'API, puis transforme la réponse en JSON.
 *    - Si la requête réussit, les données des produits sont stockées dans l'état `products`. Si une erreur survient, elle est capturée et affichée dans la console.
 * 
 * 3. Effet (`useEffect`) :
 *    - Utilisé pour appeler la fonction `fetchProducts` lorsque le composant est monté. Le tableau de dépendances vide signifie que cet effet est exécuté uniquement au montage initial.
 * 
 * 4. Rendu de la liste des produits :
 *    - Les produits sont affichés sous forme de grille réactive grâce à Tailwind CSS. Le nombre de colonnes varie en fonction de la taille de l'écran (1 colonne sur mobile, 2 sur tablette, 3 sur bureau).
 *    - Chaque produit est affiché dans une carte avec :
 *      - Une image du produit (provenant de `product.imageUrl`).
 *      - Le nom et la description du produit.
 *      - Le prix formaté en dollars.
 *      - Un bouton "Voir les détails" qui redirige vers la page de détails du produit via un lien dynamique basé sur l'ID du produit (`/products/:id`).
 * 
 * 5. Effets visuels et interactions :
 *    - Les cartes des produits ont une animation de transition au survol, augmentant leur ombre pour un effet de mise en relief.
 *    - Le bouton "Voir les détails" change de couleur au survol, offrant une transition fluide et réactive.
 * 
 * 6. Responsivité :
 *    - Le layout est entièrement responsive grâce à Tailwind CSS. La grille passe d'une à trois colonnes en fonction de la largeur de l'écran, assurant une bonne présentation sur mobile, tablette, et bureau.
 * 
 * 7. Erreur de récupération des produits :
 *    - En cas d'erreur lors de la récupération des produits, un message d'erreur est affiché dans la console, mais aucune gestion d'erreur utilisateur n'est visible dans ce code (cela pourrait être une amélioration future).
 * 
 * 8. API :
 *    - Les données des produits sont récupérées via une API locale à l'URL `http://localhost:5000/api/products`.
 * 
 * Ce composant permet aux utilisateurs de voir une liste de produits avec leurs informations de base, et de naviguer vers une page de détails de produit spécifique en cliquant sur un bouton.
 */


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Nos Produits</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.productId}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </span>
                <Link to={`/products/${product.productId}`}>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300">
                    Voir les détails
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
