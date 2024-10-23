// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children, adminOnly = false }) => {
    if (!user) {
        // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !user.isAdmin) {
        // Si la route est réservée aux administrateurs et que l'utilisateur n'est pas administrateur
        return <Navigate to="/" replace />;
    }

    // Si tout va bien, retourner les enfants
    return children;
};

export default ProtectedRoute;
