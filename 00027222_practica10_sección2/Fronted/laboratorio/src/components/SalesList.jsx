import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesList = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sales');
            setSales(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching sales:', error);
            setLoading(false);
        }
    };

    if (loading) return <div>Cargando ventas...</div>;

    return (
        <div>
            <h2>Lista de Ventas</h2>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>${sale.amount}</td>
                            <td>{new Date(sale.created_at).toLocaleDateString()}</td>
                            <td>{sale.customer_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesList;