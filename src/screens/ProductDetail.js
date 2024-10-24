/**
 * Composant `ProductDetail` pour afficher les détails d'un produit spécifique.
 * 
 * 1. États locaux (`useState`) :
 *    - `product` : Stocke les informations détaillées du produit récupéré depuis l'API. Initialement, il est nul.
 *    - `loading` : Indique si le produit est en cours de chargement depuis l'API. Initialement, il est défini à `true`.
 *    - `error` : Stocke un message d'erreur en cas de problème lors de la récupération des données produit.
 * 
 * 2. `useParams` :
 *    - Permet de récupérer l'ID du produit depuis l'URL, grâce à la fonction `useParams`. Cet ID est utilisé pour effectuer la requête à l'API.
 * 
 * 3. Effet (`useEffect`) :
 *    - `fetchProduct` : Fonction asynchrone qui récupère les détails du produit à partir de l'API, en utilisant l'ID extrait de l'URL.
 *      Si la requête est réussie, le produit est stocké dans l'état `product`. Si une erreur survient, l'état `error` est mis à jour avec un message d'erreur.
 *      L'état `loading` est utilisé pour indiquer que la requête est en cours, et il est mis à `false` une fois que la requête est terminée.
 * 
 * 4. Gestion des états (`loading`, `error`, `product`) :
 *    - Si le produit est en cours de chargement, un message "Chargement..." est affiché à l'utilisateur.
 *    - Si une erreur survient lors de la récupération des données, un message d'erreur rouge est affiché.
 *    - Si aucun produit n'est trouvé ou si le produit est null, un message "Produit non trouvé" est affiché.
 * 
 * 5. Affichage du produit :
 *    - Une fois les données récupérées avec succès, les détails du produit sont affichés :
 *      - Image du produit, nom, description, prix, et catégorie.
 *      - Si le produit contient des `features` (caractéristiques), elles sont affichées sous forme de liste à puces.
 * 
 * 6. Bouton et liens :
 *    - Un bouton "Contactez-nous" est affiché à la fin des détails produit. Il redirige potentiellement vers une section de contact (non gérée ici).
 *    - Un lien de retour permet de revenir à la liste des produits via la route `/products`.
 * 
 * 7. Responsivité :
 *    - La mise en page du produit est gérée de manière réactive : sur les petits écrans, l'image du produit prend toute la largeur, tandis que sur les écrans plus larges, elle est alignée à gauche à côté des détails du produit.
 * 
 * 8. Styles et transitions :
 *    - Le composant utilise Tailwind CSS pour le style. Le bouton "Contactez-nous" inclut une transition CSS pour rendre le changement de couleur fluide au survol.
 * 
 * 9. API :
 *    - Le composant récupère les données produit à partir de l'API locale (`http://localhost:5000/api/products/:id`), où l'ID du produit est passé dynamiquement dans l'URL.
 */


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams(); // Récupère l'ID du produit depuis l'URL

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/products/${id}`); // Ici, l'ID est `productId`
                setProduct(response.data);
            } catch (err) {
                setError('Une erreur est survenue lors du chargement du produit.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center mt-8 text-lg text-gray-600">Chargement...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
    if (!product) return <div className="text-center mt-8 text-lg text-gray-600">Produit non trouvé.</div>;

    return (
        <div className="container mx-auto p-4">
            <Link to="/products" className="text-indigo-600 hover:underline mb-4 inline-block">&larr; Retour aux produits</Link>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img className="h-48 w-full object-cover md:w-48" src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.category}</div>
                        <h2 className="mt-1 text-3xl leading-tight font-bold text-gray-900">{product.name}</h2>
                        <p className="mt-2 text-gray-600">{product.description}</p>
                        <div className="mt-4">
                            <span className="text-gray-500">Prix : </span>
                            <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        </div>
                        {product.features && product.features.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-700">Caractéristiques :</h3>
                                <ul className="list-disc list-inside mt-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="text-gray-600">{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <Link to={`/contact`}>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 mt-6">
                    Contactez-Nous
                  </button>
                </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
