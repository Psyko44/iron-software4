
/**
 * Composant `Login` pour gérer l'authentification des utilisateurs.
 * 
 * Props :
 * - `onLogin` : Fonction passée en tant que prop qui sera appelée lorsque l'utilisateur se connecte avec succès. Elle est utilisée pour gérer l'état de l'utilisateur connecté dans l'application parent.
 * 
 * 1. États locaux (`useState`) :
 *    - `username` : Contient le nom d'utilisateur saisi par l'utilisateur dans le formulaire.
 *    - `password` : Contient le mot de passe saisi par l'utilisateur dans le formulaire.
 * 
 * 2. `useNavigate` :
 *    - Permet de rediriger l'utilisateur après une connexion réussie vers la page d'accueil (`/`) ou la page d'administration (`/admin`) s'il est administrateur.
 * 
 * 3. Fonction `handleLogin` :
 *    - Cette fonction est déclenchée lorsque l'utilisateur soumet le formulaire de connexion.
 *    - Elle envoie une requête POST à l'API d'authentification (`/api/auth/login`) avec les informations de connexion (nom d'utilisateur et mot de passe).
 *    - Si la réponse de l'API est positive (`response.ok`), elle appelle la fonction `onLogin` pour mettre à jour l'état utilisateur et redirige l'utilisateur en fonction de son statut (`/admin` pour les administrateurs, `/` pour les autres).
 *    - En cas d'erreur ou de réponse incorrecte (mauvais identifiants), un message d'alerte est affiché avec les détails de l'erreur.
 * 
 * 4. Rendu du formulaire :
 *    - Le formulaire de connexion inclut deux champs : un pour le nom d'utilisateur et un pour le mot de passe, avec des icônes pour chaque champ (icônes utilisateur et cadenas).
 *    - Un bouton "Se connecter" permet de soumettre le formulaire.
 *    - Un lien "Mot de passe oublié?" est inclus sous le bouton de connexion.
 * 
 * 5. Styles et mise en page :
 *    - Le formulaire est centré verticalement et horizontalement avec une apparence moderne, grâce à Tailwind CSS.
 *    - Les champs d'entrée sont stylisés avec des bordures et une mise en page adaptée à une expérience utilisateur agréable.
 *    - Le bouton de connexion change de couleur au survol, créant une transition fluide.
 * 
 * 6. Gestion des erreurs :
 *    - En cas d'erreur réseau ou si la connexion échoue, une alerte est affichée pour informer l'utilisateur de l'erreur.
 */


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Réponse de l\'API:', data);
                onLogin(data);

                if (data.user && data.user.isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            alert("Une erreur est survenue lors de la connexion.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg max-w-md w-full">
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Connexion à votre compte</h3>
                <form onSubmit={handleLogin}>
                    <div className="mt-4">
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <FaUser className="text-gray-500 mr-3" />
                            <input
                                type="text"
                                placeholder="Entrez votre nom d'utilisateur"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300 py-2 mt-4">
                            <FaLock className="text-gray-500 mr-3" />
                            <input
                                type="password"
                                placeholder="Entrez votre mot de passe"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="flex items-baseline justify-between mt-6">
                            <button 
                                type="submit" 
                                className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300"
                            >
                                Se connecter
                            </button>
                            <a href="#" className="text-sm text-indigo-600 hover:underline">Mot de passe oublié?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
