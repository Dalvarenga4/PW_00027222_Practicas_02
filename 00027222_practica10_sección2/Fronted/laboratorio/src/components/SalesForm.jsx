import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesForm = () => {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        amount: '',
        id_customer: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/sales', {
                amount: parseFloat(formData.amount),
                id_customer: parseInt(formData.id_customer)
            });
            setMessage('Venta registrada exitosamente!');
            setFormData({ amount: '', id_customer: '' });
        } catch (error) {
            console.error('Error creating sale:', error);
            setMessage('Error al registrar la venta');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h2>Registrar Nueva Venta</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Monto:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </div>
                <div>
                    <label>Cliente:</label>
                    <select
                        name="id_customer"
                        value={formData.id_customer}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar cliente</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name} - {customer.code}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Registrar Venta</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SalesForm;