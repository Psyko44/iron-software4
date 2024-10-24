/**
 * Composant `Register` pour gérer l'inscription des utilisateurs.
 * 
 * 1. États locaux (`useState`) :
 *    - `username` : Stocke le nom d'utilisateur saisi.
 *    - `password` : Stocke le mot de passe saisi.
 *    - `confirmPassword` : Stocke la confirmation du mot de passe saisi.
 * 
 * 2. Fonction `handleRegister` :
 *    - Envoie une requête POST à l'API d'inscription avec les informations d'inscription (nom d'utilisateur et mot de passe).
 *    - **Vulnérabilité 1 : Faiblesse de validation côté client.**
 *      - **Description :** Le contrôle qui vérifie si les mots de passe correspondent n'est effectué que côté client, ce qui peut facilement être contourné si un attaquant manipule l'application (par exemple, via les outils de développement d'un navigateur).
 *      - **Risque :** Un utilisateur malveillant pourrait contourner cette vérification et soumettre des mots de passe incohérents, ce qui pourrait causer des erreurs sur le serveur si celui-ci ne fait pas une validation stricte.
 * 
 *    - **Vulnérabilité 2 : Envoi du mot de passe en clair.**
 *      - **Description :** Le mot de passe est directement envoyé dans le corps de la requête sans aucune forme de chiffrement ou de hachage côté client.
 *      - **Risque :** Cela expose le mot de passe en clair durant la transmission, rendant l'application vulnérable aux attaques de type "man-in-the-middle" si la connexion n'est pas sécurisée par HTTPS.
 * 
 *    - **Vulnérabilité 3 : Faiblesse dans la gestion des réponses de l'API.**
 *      - **Description :** Les messages renvoyés par l'API (comme `data.message`) sont affichés directement à l'utilisateur sans validation. Si l'API renvoie des messages contenant des informations sensibles (par exemple, des détails sur les erreurs), un attaquant pourrait exploiter ces informations.
 *      - **Risque :** Un attaquant pourrait utiliser ces messages pour identifier des faiblesses du système, par exemple si un nom d'utilisateur existe déjà ou pour obtenir des informations sur la structure de l'API.
 * 
 * 3. Rendu du formulaire :
 *    - Le formulaire contient des champs pour le nom d'utilisateur, le mot de passe et la confirmation du mot de passe.
 *    - **Vulnérabilité 4 : Risque d'injection XSS (Cross-Site Scripting).**
 *      - **Description :** Le champ du nom d'utilisateur permet aux utilisateurs de saisir des entrées sans validation préalable côté client.
 *      - **Risque :** Un attaquant pourrait tenter d'injecter du code JavaScript malveillant dans ce champ. Si ce code est affiché sans être correctement encodé ou filtré côté serveur, cela pourrait entraîner une attaque XSS. Cela pourrait également affecter d'autres utilisateurs ou administrateurs consultant des pages qui affichent les noms d'utilisateurs.
 * 
 * 4. Styles :
 *    - Le formulaire est centré avec un design propre, utilisant Tailwind CSS pour les styles et les effets visuels.
 * 
 * 5. Vulnérabilités supplémentaires :
 *    - **Absence de validation forte côté client :** Aucun contrôle n'est effectué sur la longueur minimale ou la complexité du mot de passe (par exemple, exiger des caractères spéciaux, des majuscules, ou une longueur minimale). Cela pourrait permettre à des utilisateurs de créer des comptes avec des mots de passe faibles et vulnérables aux attaques par force brute.
 *    - **Gestion basique des erreurs :** En cas d'erreur lors de la requête, l'application affiche simplement un message d'alerte, sans distinction des types d'erreurs (par exemple, nom d'utilisateur déjà pris, mot de passe faible, etc.), ce qui pourrait entraîner une mauvaise expérience utilisateur et fournir des indices sur les comptes existants aux attaquants.
 * 
 * 6. Sécurité des données :
 *    - **Transmission des données sensibles :** Le mot de passe est transmis en texte clair dans la requête HTTP. Il est essentiel d'utiliser une connexion sécurisée HTTPS pour protéger cette transmission.
 * 
 * Pour corriger ces vulnérabilités, il est recommandé d'ajouter une validation robuste des entrées côté client et serveur, de sécuriser la transmission des données avec HTTPS, et d'assurer un retour d'erreur générique sans divulguer trop d'informations.
 */



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // 1. Faiblesse de validation côté client (le contrôle des mots de passe est facilement contournable)
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }
        
        // 2. Faiblesse d'authentification : Envoi du mot de passe en clair (aucun hash ou encryption)
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Injection de données malveillantes possible ici sans vérification côté serveur
            body: JSON.stringify({ username, password, isAdmin: false }),
        });
    
        const data = await response.json();
        
        // 3. Réponse mal gérée, les messages de l'API pourraient être exploités pour divulguer des informations sensibles
        if (response.ok) {
            alert(data.message);
            navigate('/login'); 
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-center text-gray-800">Créer un compte</h3>
                <form onSubmit={handleRegister}>
                    <div className="mt-4">
                        <div>
                            <label className="block text-gray-700" htmlFor="username">Nom d'utilisateur</label>
                            
                            {/* 4. XSS : Permet à un attaquant d'injecter du code JavaScript malveillant */}
                            <input
                                type="text"
                                placeholder="Choisissez un nom d'utilisateur"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700" htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                placeholder="Créez un mot de passe"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700" htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            <input
                                type="password"
                                placeholder="Confirmez votre mot de passe"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                                required
                            />
                        </div>
                        <div className="flex items-baseline justify-between">
                            <button 
                                type="submit" 
                                className="px-6 py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300"
                            >
                                S'inscrire
                            </button>
                            <a href="/login" className="text-sm text-indigo-600 hover:underline">Déjà un compte?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
