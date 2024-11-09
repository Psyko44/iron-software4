import React, { useState } from 'react';

const VulnerableContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Affiche le contenu du champ `name` dans un élément avec `dangerouslySetInnerHTML`
    setSubmittedName(name); // Met à jour `submittedName` pour afficher le contenu sans échappement
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 bg-white shadow-lg rounded-lg">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Prenons contact !</h2>
        <p className="text-gray-700 text-lg">
          Vous avez un projet de logiciel ou souhaitez développer une solution sur mesure pour votre entreprise ? 
        </p>
      </div>

      {/* Formulaire de contact vulnérable */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-md">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Nom :</label>
          <input 
            type="text" 
            id="name" 
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email :</label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">Message :</label>
          <textarea 
            id="message" 
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
          Envoyer le message
        </button>
      </form>

      {/* Affichage vulnérable pour démontrer le XSS */}
      {submittedName && (
        <div className="mt-8 bg-red-100 p-4 rounded">
          <h3 className="text-lg font-bold text-red-700 mb-2">Contenu soumis :</h3>
          <div 
            // Utilisation de `dangerouslySetInnerHTML` pour voir si le script injecté est exécuté
            dangerouslySetInnerHTML={{ __html: submittedName }} 
          />
        </div>
      )}
    </div>
  );
};

export default VulnerableContactForm;
