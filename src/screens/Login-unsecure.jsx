/**
 * Composant `Login` pour gérer l'authentification des utilisateurs.
 * 
 * 1. États locaux (`useState`) :
 *    - `username` : Stocke le nom d'utilisateur saisi.
 *    - `password` : Stocke le mot de passe saisi.
 * 
 * 2. `useNavigate` :
 *    - Utilisé pour rediriger l'utilisateur vers la page d'accueil ou la page d'administration après une connexion réussie.
 * 
 * 3. Fonction `handleLogin` :
 *    - Envoie une requête POST à l'API de connexion avec le nom d'utilisateur et le mot de passe.
 *    - **Vulnérabilité :** Aucune validation des données utilisateur (`username` et `password`) n'est effectuée avant l'envoi à l'API.
 *      - **Risque :** Des champs vides ou des caractères non désirés peuvent être envoyés, ce qui pourrait entraîner des erreurs inattendues ou une exploitation par injection SQL côté serveur si l'API n'est pas correctement protégée.
 *    - Si la réponse de l'API est positive (`response.ok`), l'utilisateur est redirigé en fonction de son statut (admin ou non).
 *    - Si la connexion échoue, un message d'alerte affiche l'erreur.
 * 
 * 4. Rendu du formulaire :
 *    - Deux champs d'entrée pour le nom d'utilisateur et le mot de passe, avec des icônes correspondantes.
 *    - **Vulnérabilité :** Les champs d'entrée n'ont aucune validation côté client pour vérifier que le nom d'utilisateur ou le mot de passe respectent un format particulier (par exemple, un minimum de caractères ou l'absence de caractères spéciaux dangereux).
 *      - **Risque :** Cela permet à des utilisateurs malveillants d'injecter des scripts ou des caractères dangereux dans ces champs, ce qui pourrait entraîner des attaques de type XSS (Cross-Site Scripting) ou SQL injection si le serveur ne fait pas de vérification stricte.
 *    - Un bouton "Se connecter" pour soumettre le formulaire, et un lien vers la fonctionnalité "Mot de passe oublié".
 * 
 * 5. Styles :
 *    - Le formulaire est centré verticalement et horizontalement avec une apparence propre, utilisant Tailwind CSS pour les styles.
 * 
 * 6. **Vulnérabilité supplémentaire : Absence de protection contre les attaques de type bruteforce.**
 *    - **Risque :** Si aucune protection côté serveur n'est mise en place pour limiter le nombre de tentatives de connexion échouées, un attaquant pourrait tenter de deviner le mot de passe via des attaques par force brute (bruteforce).
 * 
 * 7. **Vulnérabilité : Mauvaise gestion des erreurs.**
 *    - **Risque :** Le message d'erreur renvoyé en cas de problème de connexion n'est pas détaillé, mais cela pourrait donner des informations sur l'existence d'un utilisateur si l'API renvoie des messages distincts pour un utilisateur non trouvé ou un mauvais mot de passe.
 *      - Une bonne pratique consiste à renvoyer un message d'erreur générique, quel que soit l'échec de la connexion (nom d'utilisateur ou mot de passe incorrect), pour ne pas exposer d'informations sur l'existence d'un compte.
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
            const response = await fetch('http://localhost:5000/api/auth/login', {
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
                                onChange={(e) => setUsername(e.target.value)}  // aucune validation ici
                                className="w-full px-4 py-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300 py-2 mt-4">
                            <FaLock className="text-gray-500 mr-3" />
                            <input
                                type="password"
                                placeholder="Entrez votre mot de passe"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}  // aucune validation ici
                                className="w-full px-4 py-2 focus:outline-none"
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
