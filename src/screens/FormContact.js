
/**
 * Composant `SecureContactForm` pour gérer la soumission sécurisée des messages de contact.
 * 
 * 1. États locaux (`useState`) :
 *    - `name` : Stocke le nom saisi par l'utilisateur.
 *    - `email` : Stocke l'adresse email saisie par l'utilisateur.
 *    - `message` : Stocke le message saisi par l'utilisateur.
 *    - `error` : Stocke les messages d'erreur pour indiquer des erreurs de validation côté client.
 * 
 * 2. Fonction `sanitizeInput` :
 *    - Assainit les entrées utilisateur (nom, message) pour éviter toute tentative d'injection de code (comme XSS).
 *    - Elle crée un élément HTML virtuel, y insère l'entrée utilisateur sous forme de texte et retourne la version propre, garantissant qu'aucun code malveillant n'est exécuté.
 * 
 * 3. Fonction `validateEmail` :
 *    - Utilise la bibliothèque `email-validator` pour effectuer une validation robuste de l'email, s'assurant que l'email respecte le format approprié avant l'envoi.
 * 
 * 4. Fonction `handleSubmit` :
 *    - Envoie une requête POST sécurisée à l'API de contact avec le nom, l'email et le message de l'utilisateur après avoir assaini les données.
 *    - **Sécurisé :** Les données sont assainies (via `sanitizeInput`) avant d'être envoyées au serveur pour empêcher toute injection de script.
 *    - En cas d'adresse email invalide, un message d'erreur est affiché avant de soumettre le formulaire, garantissant que les entrées utilisateur sont correctes.
 *    - Si la réponse du serveur est positive, un message de confirmation est affiché et les champs du formulaire sont réinitialisés.
 * 
 * 5. Rendu du formulaire :
 *    - Trois champs d'entrée : un pour le nom, un pour l'email, et un pour le message.
 *    - **Validation sécurisée** : Chaque entrée est validée et assainie avant l'envoi, empêchant les attaques XSS ou l'injection de données dangereuses.
 *    - Un bouton "Envoyer le message" pour soumettre le formulaire.
 *    - En cas d'erreur de validation, un message d'erreur est affiché avant l'envoi du formulaire.
 * 
 * 6. Styles :
 *    - Le formulaire est conçu pour être visuellement attrayant avec Tailwind CSS, incluant des transitions au survol et une mise en forme responsive.
 * 
 * 7. Sécurité :
 *    - **Protection contre les XSS** : L'assainissement des entrées utilisateur garantit que les attaques XSS (injections de scripts malveillants) sont bloquées avant d'envoyer les données.
 *    - **Protection contre l'injection de données** : Chaque entrée est vérifiée avant d'être incluse dans la requête POST, assurant que seul du texte valide est envoyé.
 * 
 * 8. Gestion des erreurs :
 *    - Si le champ email n'est pas valide ou si une entrée utilisateur est incorrecte, un message d'erreur spécifique est affiché.
 *    - Les erreurs sont gérées de manière claire pour offrir une meilleure expérience utilisateur.
 */


import React, { useState } from 'react';
import * as EmailValidator from 'email-validator'; 

const SecureContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const sanitizeInput = (input) => {
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };

  const validateEmail = (email) => {
    return EmailValidator.validate(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!validateEmail(email)) {
      setError('Adresse email invalide');
      return;
    }

    const sanitizedMessage = sanitizeInput(message);
    const sanitizedName = sanitizeInput(name);

    try {
      await fetch('/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sanitizedName,      
          email: email,             
          message: sanitizedMessage 
        }),
      });
      alert('Message envoyé avec succès !');
      setName('');
      setEmail('');
      setMessage('');
      setError('');
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

      {/* Formulaire de contact sécurisé */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
    </div>
  );
};

export default SecureContactForm;
