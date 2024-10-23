import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams(); // Récupère l'ID du produit depuis l'URL

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError('Une erreur est survenue lors du chargement du produit.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center mt-8 text-lg text-gray-600">Chargement...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
    if (!product) return <div className="text-center mt-8 text-lg text-gray-600">Produit non trouvé.</div>;

    return (
        <div className="container mx-auto p-4">
            <Link to="/products" className="text-indigo-600 hover:underline mb-4 inline-block">&larr; Retour aux produits</Link>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img className="h-48 w-full object-cover md:w-48" src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.category}</div>
                        <h2 className="mt-1 text-3xl leading-tight font-bold text-gray-900">{product.name}</h2>
                        <p className="mt-2 text-gray-600">{product.description}</p>
                        <div className="mt-4">
                            <span className="text-gray-500">Prix : </span>
                            <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        </div>
                        {product.features && product.features.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-700">Caractéristiques :</h3>
                                <ul className="list-disc list-inside mt-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="text-gray-600">{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300">
                            Contactez-nous
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
