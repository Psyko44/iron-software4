import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iron from "../assets/iron.png";

const Navbar = ({ user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // Appelle la fonction de déconnexion passée en prop
        navigate('/'); // Redirige vers la page d'accueil après la déconnexion
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
                            
                            {user && ( // Vérifiez si l'utilisateur est connecté avant d'afficher le lien
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
                        
                        {user && ( // Vérifiez si l'utilisateur est connecté avant d'afficher le lien
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
