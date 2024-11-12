/**
 * Composant `Register` pour permettre aux utilisateurs de s'inscrire à l'application.
 * 
 * États locaux (`useState`) :
 * - `username` : Contient le nom d'utilisateur saisi dans le formulaire.
 * - `password` : Contient le mot de passe saisi dans le formulaire.
 * - `confirmPassword` : Contient la confirmation du mot de passe saisi par l'utilisateur.
 * 
 * `useNavigate` :
 * - Utilisé pour rediriger l'utilisateur vers la page de connexion après une inscription réussie.
 * 
 * Fonction `handleRegister` :
 * - Cette fonction est déclenchée lorsque le formulaire est soumis.
 * - Vérifie si les champs `password` et `confirmPassword` correspondent. Si ce n'est pas le cas, une alerte est affichée.
 * - Si les mots de passe correspondent, une requête POST est envoyée à l'API d'inscription (`/api/auth/register`) avec les données de l'utilisateur (nom d'utilisateur et mot de passe).
 * - Si la requête est réussie (`response.ok`), un message de confirmation est affiché, et l'utilisateur est redirigé vers la page de connexion.
 * - Si la requête échoue (par exemple, si l'utilisateur existe déjà), un message d'erreur est affiché à l'utilisateur.
 * 
 * Rendu du formulaire :
 * - Le formulaire contient des champs pour le nom d'utilisateur, le mot de passe et la confirmation du mot de passe.
 * - Chaque champ est stylisé avec Tailwind CSS et a un effet visuel lorsque l'utilisateur le sélectionne (focus).
 * - Un bouton "S'inscrire" soumet le formulaire, et un lien vers la page de connexion est fourni pour les utilisateurs ayant déjà un compte.
 * 
 * Styles et mise en page :
 * - Le formulaire est centré sur l'écran avec une apparence propre et moderne, grâce à Tailwind CSS.
 * - Le bouton "S'inscrire" a une transition de couleur au survol, ce qui améliore l'expérience utilisateur.
 * 
 * Validation :
 * - Le formulaire vérifie localement si le mot de passe et la confirmation du mot de passe correspondent avant d'envoyer la requête à l'API.
 * 
 * API :
 * - Les informations de l'utilisateur (nom d'utilisateur, mot de passe) sont envoyées sous forme de requête POST à l'API locale à l'URL `${process.env.REACT_APP_API_BASE_URL}/api/auth/register`.
 * 
 * Ce composant permet aux utilisateurs de s'inscrire à l'application en créant un nouveau compte.
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
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, isAdmin: false }),
        });
    
        const data = await response.json();
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
