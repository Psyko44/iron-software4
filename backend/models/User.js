/**
 * Ce fichier définit un modèle d'utilisateur basé sur le schéma suivant :
 * 
 * 1. `username`: C'est un champ de type String qui est requis et doit être unique. Il représente le nom d'utilisateur.
 * 
 * 2. `password`: Champ de type String également requis. Il représente le mot de passe associé à chaque utilisateur.
 * 
 * 3. `isAdmin`: Champ de type Boolean, avec une valeur par défaut définie à `false`. Ce champ détermine si l'utilisateur 
 *    a des privilèges d'administrateur. Si ce champ est `true`, l'utilisateur est administrateur, sinon, il est un 
 *    utilisateur standard.
 * 
 * Le modèle `User` est ensuite créé pour manipuler les utilisateurs en fonction de cette structure (schéma) dans la base de données.
 */


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }, 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
