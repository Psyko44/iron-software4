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
        const response = await fetch('http://localhost:5000/api/auth/register', {
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
