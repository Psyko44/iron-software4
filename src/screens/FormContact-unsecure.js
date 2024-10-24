
/**
 * Composant `VulnerableContactForm` pour gérer la soumission des messages de contact, avec des failles de sécurité intentionnelles.
 * 
 * 1. États locaux (`useState`) :
 *    - `name` : Stocke le nom saisi par l'utilisateur.
 *    - `email` : Stocke l'adresse email saisie par l'utilisateur.
 *    - `message` : Stocke le message saisi par l'utilisateur.
 * 
 * 2. Fonction `handleSubmit` :
 *    - Envoie une requête POST à l'API de contact avec les informations fournies par l'utilisateur (nom, email, message) sans validation ou assainissement.
 *    - **Vulnérabilité :** Les données utilisateur sont envoyées directement sans aucune validation ou assainissement.
 *      - **Risque :** Un utilisateur peut soumettre des scripts malveillants dans les champs `name` ou `message`, ouvrant la voie à des attaques XSS.
 *    - Si la réponse du serveur est positive, un message de confirmation est affiché, mais aucune protection n'est mise en place contre l'injection de contenu dangereux.
 * 
 * 3. Rendu du formulaire :
 *    - Trois champs d'entrée : un pour le nom, un pour l'email, et un pour le message.
 *    - **Vulnérabilité :** Les champs `name` et `message` n'ont aucune validation ou assainissement, permettant à un utilisateur d'injecter du code JavaScript ou HTML malveillant.
 *      - **Risque :** Des attaques XSS (Cross-Site Scripting) peuvent se produire si des données malveillantes sont soumises via ces champs.
 *    - **Vulnérabilité dans la validation de l'email :** L'email est validé uniquement à l'aide du type `email` de HTML5, sans vérification supplémentaire côté client, ce qui permet de soumettre des emails incorrects.
 * 
 * 4. Styles :
 *    - Le formulaire est visuellement attrayant grâce à Tailwind CSS, mais les vulnérabilités dans la gestion des entrées rendent le système exposé aux attaques.
 * 
 * 5. **Vulnérabilité : Absence de protection contre les attaques XSS (Cross-Site Scripting) :**
 *    - **Risque :** Un utilisateur malveillant peut injecter du code JavaScript dans les champs `name` ou `message`. Ce code pourrait être exécuté si les données ne sont pas correctement assainies côté serveur, compromettant la sécurité du site et des autres utilisateurs.
 * 
 * 6. **Vulnérabilité : Absence de validation et d'assainissement des entrées :**
 *    - **Risque :** Les données sont envoyées au serveur sans être nettoyées, ce qui laisse la porte ouverte aux injections de commandes ou d'autres attaques côté serveur (NoSQL/SQL injection).
 * 
 * 7. **Vulnérabilité supplémentaire : Mauvaise gestion des erreurs.**
 *    - **Risque :** Le formulaire ne gère pas correctement les erreurs. Par exemple, si un email invalide est soumis, l'utilisateur ne reçoit aucune information sur l'erreur, ce qui peut entraîner une mauvaise expérience utilisateur.
 *    - **Solution proposée :** Ajouter une validation renforcée côté client et un affichage clair des messages d'erreur.
 */


import React, { useState } from 'react';

const VulnerableContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Envoi des données sans validation côté client
    try {
      await fetch('/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,      // Vulnérabilité XSS possible
          email: email,    // Pas de validation d'email renforcée
          message: message // Peut contenir du script ou des caractères dangereux
        }),
      });
      alert('Message envoyé !');
    } catch (error) {
      alert('Erreur lors de l\'envoi du message.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 bg-white shadow-lg rounded-lg">
      {/* Introduction attrayante */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Prenons contact !</h2>
        <p className="text-gray-700 text-lg">
          Vous avez un projet de logiciel ou souhaitez développer une solution sur mesure pour votre entreprise ? 
          Chez <span className="text-indigo-600 font-semibold">Iron4Software</span>, nous sommes spécialisés dans la création de logiciels adaptés à vos besoins.
        </p>
        <p className="text-gray-700 text-lg mt-4">
          Que vous ayez besoin d’informations supplémentaires ou que vous souhaitiez discuter de votre prochain projet, 
          nous serions ravis de vous accompagner. Remplissez le formulaire ci-dessous et nous reviendrons vers vous rapidement !
        </p>
      </div>
  
      {/* Formulaire de contact vulnérable */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-md">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Nom :</label>
          {/* Aucune protection contre les XSS ou injection */}
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
          {/* Validation de base uniquement */}
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
          {/* Aucune protection contre les entrées dangereuses */}
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
    </div>
  );
};

export default VulnerableContactForm;
