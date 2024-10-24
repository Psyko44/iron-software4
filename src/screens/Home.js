
/**
 * Composant `Home` qui représente la page d'accueil de l'application.
 * 
 * 1. États locaux (`useState`) :
 *    - `featuredProducts` : Liste des produits vedettes qui sont affichés sur la page d'accueil. 
 *      Initialement vide, cette liste est remplie après avoir récupéré les données depuis l'API.
 * 
 * 2. Effet (`useEffect`) :
 *    - `fetchFeaturedProducts` : Fonction asynchrone qui effectue une requête `fetch` vers l'API pour récupérer les produits.
 *      Une fois les données récupérées, elle sélectionne les quatre premiers produits et les stocke dans `featuredProducts`.
 *      Un gestionnaire d'erreurs est inclus pour capturer et afficher toute erreur éventuelle dans la console.
 * 
 * 3. Structure du rendu :
 *    - Un titre d'accueil et une brève introduction de l'entreprise sont affichés en haut de la page.
 *    - Un bouton permet de naviguer vers la page des produits pour consulter la liste complète.
 *    - La section "Nos produits vedettes" affiche une grille des quatre premiers produits récupérés depuis l'API, 
 *      chaque produit ayant un titre, une description tronquée, un prix et une image. Un effet de zoom (scale) est appliqué au survol des produits.
 * 
 * 4. Section "Pourquoi choisir Iron4Software" :
 *    - Cette section présente trois avantages de l'entreprise sous forme de cartes avec des icônes : 
 *      Expertise technique, Solutions sur mesure, et Support continu.
 *    - Chaque carte est interactive avec un effet de zoom (scale) au survol.
 * 
 * 5. Appel à l'action :
 *    - La dernière section de la page invite les visiteurs à entrer en contact pour discuter des solutions logicielles proposées.
 *    - Un bouton redirige vers la page de contact pour faciliter la prise de contact avec l'entreprise.
 * 
 * 6. Responsivité :
 *    - La grille des produits vedettes est responsive, passant d'une colonne sur les petits écrans à quatre colonnes sur les grands écrans.
 *    - La section "Pourquoi choisir Iron4Software" est également adaptée pour une disposition en une ou trois colonnes en fonction de la taille de l'écran.
 * 
 * 7. Transitions et styles :
 *    - Des transitions CSS sont appliquées sur divers éléments pour des interactions fluides et agréables (par exemple, les boutons et les produits vedettes).
 *    - Les styles et classes Tailwind CSS sont utilisés pour la mise en page, les espacements, et les couleurs.
 */


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setFeaturedProducts(data.slice(0, 4));
            } catch (error) {
                console.error("Erreur lors de la récupération des produits vedettes:", error);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="bg-slate-400 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Bienvenue chez Iron4Software</h1>
            <p className="text-xl text-gray-800 font-semibold mb-8">
                Nous sommes une TPE spécialisée dans le développement de logiciels innovants pour répondre à vos besoins spécifiques.
            </p>
            <div className="space-x-4 mb-12">
                <Link to="/products" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Voir tous nos produits
                </Link>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos produits vedettes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {featuredProducts.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border border-gray-200">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-2">{product.description.substring(0, 100)}...</p>
                            <p className="text-indigo-600 font-bold">${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>

            
            {/* Pourquoi choisir Iron4Software */}
<div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-md mb-12">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Pourquoi choisir Iron4Software ?</h2>
    <hr className="border-gray-300 mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-4 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Expertise technique</h3>
            <p className="mt-2 text-base text-gray-500">
                Notre équipe de développeurs expérimentés maîtrise les dernières technologies pour créer des solutions logicielles robustes et évolutives.
            </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Solutions sur mesure</h3>
            <p className="mt-2 text-base text-gray-500">
                Nous développons des logiciels personnalisés qui s'adaptent parfaitement à vos processus métier et à vos objectifs spécifiques.
            </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Support continu</h3>
            <p className="mt-2 text-base text-gray-500">
                Nous offrons un support technique réactif et des mises à jour régulières pour assurer la pérennité et l'efficacité de vos solutions logicielles.
            </p>
        </div>
    </div>
</div>


            <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Prêt à transformer votre entreprise ?</h2>
                <p className="text-lg text-gray-700 mb-6">
                    Découvrez comment nos solutions logicielles peuvent propulser votre entreprise vers de nouveaux sommets.
                </p>
                <Link to="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300">
                    Contactez-nous
                </Link>
            </div>
        </div>
    );
};

export default Home;
