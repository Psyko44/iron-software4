// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';
import Products from './screens/Products';
import Admin from './screens/Admin';
import Home from './screens/Home';
import Navbar from './components/NavBar';
import ProductDetail from './screens/ProductDetail';
import ProtectedRoute from './utils/ProtectedRoute';
import axios from 'axios';
import Footer from './screens/Footer';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Vérifier si un token existe dans le localStorage au chargement de l'app
        const token = localStorage.getItem('token');
        if (token) {
            // Si un token existe, vous pouvez faire une requête pour obtenir les infos de l'utilisateur
            // et mettre à jour l'état user
            fetchUserInfo(token);
        }
    }, []);

    const fetchUserInfo = async (token) => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des infos utilisateur:", error);
            localStorage.removeItem('token'); // Supprimer le token si invalide
        }
    };

    const handleLogin = (userData) => {
        localStorage.setItem('token', userData.token);
        setUser(userData.user);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <Router>
            <div className="min-h-screen bg-slate-400">
                <Navbar user={user} onLogout={handleLogout} />
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <Routes>
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/register" element={<Register />} />
                        <Route 
                            path="/products" 
                            element={
                                <ProtectedRoute user={user}>
                                    <Products />
                                </ProtectedRoute>
                            } 
                        />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route 
                            path="/admin" 
                            element={
                                <ProtectedRoute user={user}>
                                    <Admin />
                                </ProtectedRoute>
                            } 
                        />
                        <Route path="/" element={<Home />} /> 
                    </Routes>
                </main>
                
            </div>
            <Footer />
            
        </Router>
    );
};

export default App;
