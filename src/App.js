// App.js


/**
 * Composant principal `App` qui gère la navigation et l'état global de l'utilisateur dans l'application.
 * 
 * 1. États locaux (`useState`) :
 *    - `user` : Stocke les informations de l'utilisateur connecté. Initialement, il est nul, ce qui signifie qu'aucun utilisateur n'est connecté.
 * 
 * 2. Effet (`useEffect`) :
 *    - Utilisé pour vérifier si un jeton (`token`) d'authentification est présent dans `localStorage` au montage initial de l'application.
 *    - Si un jeton est trouvé, la fonction `fetchUserInfo` est appelée pour récupérer les informations de l'utilisateur connecté et mettre à jour l'état `user`.
 * 
 * 3. Fonction `fetchUserInfo` :
 *    - Cette fonction fait une requête GET à l'API pour récupérer les informations de l'utilisateur connecté à l'aide du jeton d'authentification.
 *    - Si la requête échoue (par exemple, si le jeton est invalide ou expiré), une erreur est capturée et le jeton est supprimé du `localStorage`.
 * 
 * 4. Fonction `handleLogin` :
 *    - Cette fonction est appelée après une connexion réussie. Elle stocke le jeton d'authentification dans `localStorage` et met à jour l'état `user` avec les informations de l'utilisateur.
 * 
 * 5. Fonction `handleLogout` :
 *    - Cette fonction est appelée lorsque l'utilisateur se déconnecte. Elle supprime le jeton du `localStorage` et réinitialise l'état `user` à `null`.
 * 
 * 6. Navigation avec `React Router` :
 *    - Le composant utilise `BrowserRouter` pour gérer la navigation de l'application.
 *    - `Routes` et `Route` sont utilisés pour définir les différentes pages accessibles dans l'application.
 * 
 * 7. Routes protégées (`ProtectedRoute`) :
 *    - Certaines routes comme `/products` et `/admin` sont protégées et ne sont accessibles que si un utilisateur est connecté.
 *    - Le composant `ProtectedRoute` vérifie si l'utilisateur est connecté avant de lui permettre d'accéder à ces pages. Sinon, il est redirigé.
 * 
 * 8. Composants enfants :
 *    - `Navbar` : Barre de navigation qui affiche les liens dynamiquement en fonction de l'état de connexion de l'utilisateur.
 *    - `Footer` : Pied de page affiché en bas de chaque page.
 *    - `Login` : Page de connexion qui appelle `handleLogin` lorsque l'utilisateur se connecte avec succès.
 *    - `Register` : Page d'inscription pour créer un nouveau compte utilisateur.
 *    - `Products` : Page qui affiche la liste des produits, protégée par l'authentification.
 *    - `ProductDetail` : Page de détails d'un produit spécifique.
 *    - `Admin` : Panneau d'administration accessible uniquement aux utilisateurs connectés, également protégé.
 *    - `Home` : Page d'accueil accessible à tout le monde.
 * 
 * 9. Gestion du layout :
 *    - La page utilise Tailwind CSS pour définir une mise en page réactive avec un espace principal centré et un fond gris.
 *    - Le contenu principal est contenu dans une largeur maximale de `7xl` et centré horizontalement.
 * 
 * En résumé, ce composant gère l'authentification de l'utilisateur, la navigation entre les différentes pages, et contrôle l'accès aux routes protégées.
 */



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login-unsecure';
import Register from './screens/Register-unsecure';
import Products from './screens/Products';
import Admin from './screens/Admin';
import Home from './screens/Home';
import Navbar from './components/NavBar';
import ProductDetail from './screens/ProductDetail';
import ProtectedRoute from './utils/ProtectedRoute';
import axios from 'axios';
import Footer from './screens/Footer';
import VulnerableContactForm from './screens/FormContact-unsecure';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if (token) {
            
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
            localStorage.removeItem('token'); 
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
                        <Route path ="/contact" element={<VulnerableContactForm />} /> 
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
