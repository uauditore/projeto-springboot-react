import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productSchema } from '../validacao/validation';
import { z } from 'zod';

const ProductDetail = ({ products, setProducts}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === parseInt(id));

    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState(product.name);
    const [brand, setBrand] = useState(product.brand);
    const [price, setPrice] = useState(product.price);
    const [error, setError] = useState(null);

    const handleAddToCart = () => {
        console.log(`Adicionado ${quantity}x ${product.name} ao carrinho.`);
    };

    const handleUpdateProduct = () => {
        const updatedProduct = { id: product.id, name, brand, price };

        try {
            productSchema.parse(updatedProduct);
            setProducts(products.map(p => p.id === product.id ? updatedProduct : p));
            navigate('/produtos');
        } catch (e) {
            if (e instanceof z.ZodError) {
                setError(e.errors.map(err => err.message).join(', '));
            } else {
                console.error(e);
            }
        }
    };

    const handleRemoveProduct = () => {
        setProducts(products.filter(p => p.id !== product.id));
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <h2>Detalhes do Produto</h2>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{product.nome}</h3>
                    <p className="card-text">Marca: {product.marca}</p>
                    <p className="card-text">Preço: R${product.price.toFixed(2)}</p>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantidade</label>
                        <input
                            type="number"
                            id="quantity"
                            className="form-control"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            min="1"
                        />
                    </div>
                    <button onClick={handleAddToCart} className="btn btn-primary mt-3">Adicionar ao Carrinho</button>

                            <h4 className="mt-4">Administração do Produto</h4>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="brand">Marca</label>
                                <input
                                    type="text"
                                    id="brand"
                                    className="form-control"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Preço</label>
                                <input
                                    type="number"
                                    id="price"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                                />
                            </div>
                            <button onClick={handleUpdateProduct} className="btn btn-warning mt-3">Alterar Produto</button>
                            <button onClick={handleRemoveProduct} className="btn btn-danger mt-3">Remover Produto</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
