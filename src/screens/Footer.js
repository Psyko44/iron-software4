import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between">
                    
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold">Iron4Software</h3>
                        <p className="mt-2">Votre partenaire pour des solutions logicielles innovantes.</p>
                    </div>

                    
                    <div className="mb-4">
                        <h4 className="text-md font-semibold">Liens utiles</h4>
                        <ul className="mt-2 space-y-1">
                            <li><Link to="/" className="hover:underline">Accueil</Link></li>
                            <li><Link to="/products" className="hover:underline">Produits</Link></li>
                            <li><Link to="/contact" className="hover:underline">Contactez-nous</Link></li>
                            <li><Link to="/privacy" className="hover:underline">Politique de confidentialité</Link></li>
                            <li><Link to="/terms" className="hover:underline">Conditions d'utilisation</Link></li>
                        </ul>
                    </div>

                    
                    <div className="mb-4">
                        <h4 className="text-md font-semibold">Suivez-nous</h4>
                        <div className="flex space-x-4 mt-2">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebook className="h-6 w-6 hover:text-indigo-400 transition duration-200" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <FaTwitter className="h-6 w-6 hover:text-indigo-400 transition duration-200" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin className="h-6 w-6 hover:text-indigo-400 transition duration-200" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram className="h-6 w-6 hover:text-indigo-400 transition duration-200" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-700 pt-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Iron4Software. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
