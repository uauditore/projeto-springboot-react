import React, { useState } from 'react';

const Cart = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Produto 1', price: 100, quantity: 1 },
        { id: 2, name: 'Produto 2', price: 200, quantity: 1 },
    ]);

    const handleQuantityChange = (id, newQuantity) => {
        setItems(items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    };

    const handleRemoveItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Carrinho de Compras</h2>
            {items.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Total</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>R${item.price.toFixed(2)}</td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        min="1"
                                    />
                                </td>
                                <td>R${(item.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="text-right">Total:</td>
                            <td colSpan="2">R${total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
};

export default Cart;
