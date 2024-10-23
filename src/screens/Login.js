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
