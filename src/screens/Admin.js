
/**
 * Composant `Admin` pour la gestion des produits et des utilisateurs dans l'interface d'administration.
 * 
 * 1. États locaux (`useState`) :
 *    - `products` : Liste des produits récupérés depuis l'API.
 *    - `users` : Liste des utilisateurs récupérés depuis l'API.
 *    - `newProduct` : Objet pour capturer les informations du nouveau produit à ajouter.
 *    - `newUser` : Objet pour capturer les informations du nouvel utilisateur à ajouter.
 *    - `activeTab` : Détermine l'onglet actif ("products" ou "users") pour afficher soit la gestion des produits, soit la gestion des utilisateurs.
 *    - `selectedProduct` : Produit actuellement sélectionné pour la modification ou la suppression.
 *    - `editMode` : Boolean pour activer/désactiver le mode édition pour les produits.
 * 
 * 2. Effets (`useEffect`) :
 *    - `fetchProducts` : Fonction appelée au montage du composant pour récupérer la liste des produits via une requête GET à l'API.
 *    - `fetchUsers` : Fonction appelée au montage du composant pour récupérer la liste des utilisateurs via une requête GET à l'API.
 * 
 * 3. Gestion des produits :
 *    - `handleAddProduct` : Fonction pour ajouter un nouveau produit en envoyant une requête POST à l'API, puis en mettant à jour la liste des produits.
 *    - `handleUpdateProduct` : Fonction pour mettre à jour un produit sélectionné via une requête PUT, puis actualiser la liste des produits.
 *    - `handleDeleteProduct` : Supprime un produit sélectionné via une requête DELETE à l'API, puis met à jour la liste.
 *    - `handleProductSelect` : Sélectionne un produit depuis le menu déroulant pour l'afficher ou le modifier.
 * 
 * 4. Gestion des utilisateurs :
 *    - `handleAddUser` : Fonction pour ajouter un nouvel utilisateur via une requête POST, puis actualiser la liste des utilisateurs.
 *    - `handleDeleteUser` : Supprime un utilisateur via une requête DELETE.
 *    - `handleToggleAdmin` : Modifie le statut admin d'un utilisateur via une requête PUT à l'API.
 * 
 * 5. Interface :
 *    - Un système d'onglets permet de basculer entre la gestion des produits et celle des utilisateurs.
 *    - La section des produits permet de sélectionner un produit pour l'éditer ou le supprimer, ainsi que d'ajouter un nouveau produit.
 *    - La section des utilisateurs permet d'ajouter un utilisateur, de modifier son statut d'administrateur, et de supprimer des utilisateurs.
 * 
 * 6. Gestion des erreurs :
 *    - Chaque fonction d'appel à l'API inclut une gestion des erreurs pour afficher un message dans la console en cas de problème.
 * 
 * Le composant utilise `axios` pour les appels à l'API et gère les produits et les utilisateurs via des requêtes CRUD (Create, Read, Update, Delete).
 */


import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });
  const [activeTab, setActiveTab] = useState("products");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", newProduct); 
      fetchProducts();
      setNewProduct({
        productId: "",
        name: "",
        description: "",
        price: "",
        imageUrl: "",
      }); 
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit", error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/products/${selectedProduct.productId}`,
        selectedProduct
      ); 
      fetchProducts();
      setSelectedProduct(null);
      setEditMode(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit", error);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${selectedProduct.productId}`
      ); 
      fetchProducts();
      setSelectedProduct(null);
    } catch (error) {
      console.error("Erreur lors de la suppression du produit", error);
    }
  };

  const handleProductSelect = (e) => {
    const product = products.find(
      (p) => p.productId === parseInt(e.target.value)
    ); 
    setSelectedProduct(product);
    setEditMode(false);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", newUser);
      fetchUsers();
      setNewUser({ username: "", password: "", isAdmin: false });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur", error);
    }
  };

  const handleToggleAdmin = async (id, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/update-user-admin/${id}`,
        {
          isAdmin: !currentStatus,
        }
      );
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut admin", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Panneau d'administration</h1>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === "products" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Produits
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Utilisateurs
        </button>
      </div>

      {activeTab === "products" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Gestion des Produits</h2>
          <div className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
            <select
              onChange={handleProductSelect}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-4"
            >
              <option value="">Sélectionnez un produit</option>
              {products.map((product) => (
                <option key={product.productId} value={product.productId}>
                  {product.name}
                </option> 
              ))}
            </select>
            {selectedProduct && (
              <div>
                {editMode ? (
                  <form onSubmit={handleUpdateProduct}>
                    <input
                      type="number"
                      value={selectedProduct.productId} 
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          productId: e.target.value, 
                        })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    />
                    <input
                      type="text"
                      value={selectedProduct.name}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          name: e.target.value,
                        })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    />
                    <input
                      type="text"
                      value={selectedProduct.description}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          description: e.target.value,
                        })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    />
                    <input
                      type="number"
                      value={selectedProduct.price}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          price: e.target.value,
                        })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    />
                    <input
                      type="text"
                      value={selectedProduct.imageUrl}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          imageUrl: e.target.value,
                        })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    />
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Sauvegarder
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Annuler
                    </button>
                  </form>
                ) : (
                  <div>
                    <p>
                      <strong>ID du Produit:</strong>{" "}
                      {selectedProduct.productId}
                    </p>
                    <p>
                      <strong>Nom:</strong> {selectedProduct.name}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedProduct.description}
                    </p>
                    <p>
                      <strong>Prix:</strong> ${selectedProduct.price}
                    </p>
                    <p>
                      <strong>URL de l'image:</strong>{" "}
                      {selectedProduct.imageUrl}
                    </p>
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={handleDeleteProduct}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          
          <h3 className="text-xl font-bold mb-2">Ajouter un nouveau produit</h3>
          <form
            onSubmit={handleAddProduct}
            className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <input
                type="number"
                placeholder="ID du produit"
                value={newProduct.productId}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, productId: e.target.value })
                }
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nom du produit"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Prix"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="URL de l'image"
                value={newProduct.imageUrl}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, imageUrl: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Ajouter Produit
            </button>
          </form>
        </div>
      )}

      {activeTab === "users" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Gestion des Utilisateurs</h2>
          <form
            onSubmit={handleAddUser}
            className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8"
          >
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Mot de passe"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={newUser.isAdmin}
                  onChange={(e) =>
                    setNewUser({ ...newUser, isAdmin: e.target.checked })
                  }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Admin</span>
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Ajouter Utilisateur
            </button>
          </form>
          <h3 className="text-xl font-bold mb-2">Liste des Utilisateurs</h3>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <strong>{user.username}</strong> -{" "}
                  {user.isAdmin ? "Admin" : "Utilisateur"}
                </div>
                <div>
                  <button
                    onClick={() => handleToggleAdmin(user._id, user.isAdmin)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    {user.isAdmin ? "Révoquer Admin" : "Rendre Admin"}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
