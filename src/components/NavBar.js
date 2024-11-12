

/**
 * Composant `Navbar` pour gérer la barre de navigation de l'application.
 * 
 * Props :
 * - `user` : Objet représentant l'utilisateur connecté, utilisé pour afficher des liens spécifiques (comme Produits et Admin) en fonction de l'état de connexion et du rôle de l'utilisateur.
 * - `onLogout` : Fonction appelée lorsque l'utilisateur clique sur le bouton de déconnexion.
 * 
 * 1. `useState` :
 *    - `isOpen` : État local pour gérer l'ouverture et la fermeture du menu de navigation mobile (burger menu).
 * 
 * 2. `useNavigate` :
 *    - Utilisé pour rediriger l'utilisateur après la déconnexion.
 * 
 * 3. `handleLogout` :
 *    - Cette fonction est déclenchée lorsque l'utilisateur clique sur le bouton "Se déconnecter". Elle appelle la fonction `onLogout` (passée en props) pour gérer la déconnexion, puis redirige l'utilisateur vers la page d'accueil (`/`).
 * 
 * 4. Contenu de la Navbar (version bureau et mobile) :
 *    - Le logo (image de l'entreprise) et le nom de l'application sont toujours visibles.
 *    - Si l'utilisateur est connecté (`user` est défini), le lien vers la page des produits apparaît, ainsi que le bouton "Se déconnecter".
 *    - Si l'utilisateur est un administrateur (`user.isAdmin` est vrai), un lien supplémentaire vers la page Admin est affiché.
 *    - Si l'utilisateur n'est pas connecté (`!user`), les boutons "Se connecter" et "S'inscrire" apparaissent.
 * 
 * 5. Menu mobile :
 *    - Lorsque l'écran est réduit (version mobile), un bouton burger est affiché pour ouvrir/fermer le menu de navigation.
 *    - Le menu s'affiche sous forme d'une liste déroulante lorsque `isOpen` est vrai.
 * 
 * 6. Transition et apparence :
 *    - La classe `hover:bg-indigo-600` avec `hover:text-white` ajoute une transition visuelle lors du survol des liens.
 *    - Les styles de la navbar et des éléments de navigation sont définis pour rendre l'interface réactive et esthétiquement agréable sur les écrans de différentes tailles.
 */




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iron from "../assets/iron.png";

const Navbar = ({ user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); 
        navigate('/'); 
    };

    return (
        <nav className="bg-white text-black font-bold shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img src={iron} alt="Iron 4 Software" className="h-8" />
                            <span className="ml-2 text-xl font-bold text-gray-900">Iron4Software</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            
                            {user && ( 
                                <Link
                                    to="/products"
                                    className="text-black hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-semibold transition duration-300"
                                >
                                    Produits
                                </Link>
                            )}
                            {!user ? (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-black hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-semibold transition duration-300"
                                    >
                                        Se connecter
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="text-black hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-semibold transition duration-300"
                                    >
                                        S'inscrire
                                    </Link>
                                    <Link
                                    to="/contact"
                                    className="text-black hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-semibold transition duration-300"
                                >
                                    Contact
                                </Link>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="text-black hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-semibold transition duration-300"
                                >
                                    Se déconnecter
                                </button>
                            )}
                            {user && user.isAdmin && (
                                <Link
                                    to="/admin"
                                    className="text-black hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-semibold transition duration-300"
                                >
                                    Admin
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-black hover:text-indigo-600 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        
                        {user && ( 
                            <Link
                                to="/products"
                                className="text-black hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-semibold transition duration-300"
                            >
                                Produits
                            </Link>
                        )}
                        {!user ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-black hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-semibold transition duration-300"
                                >
                                    Se connecter
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-black hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-semibold transition duration-300"
                                >
                                    S'inscrire
                                </Link>
                                <Link
                                    to="/contact"
                                    className="text-black hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-semibold transition duration-300"
                                >
                                    Contact
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="text-black hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-semibold transition duration-300"
                            >
                                Se déconnecter
                            </button>
                        )}
                        {user && user.isAdmin && (
                            <Link
                                to="/admin"
                                className="text-black hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-semibold transition duration-300"
                            >
                                Admin
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
