import React, { useState } from 'react';
import axios from 'axios';

const CustomerSearch = () => {
    const [code, setCode] = useState('');
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!code.trim()) return;

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/customers/search?code=${code}`);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error searching customers:', error);
            setCustomers([]);
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Buscar Cliente por Código</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Ingrese el código del cliente"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {customers.length > 0 && (
                <div>
                    <h3>Resultados:</h3>
                    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Código</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.code}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {customers.length === 0 && code && !loading && (
                <p>No se encontraron clientes con ese código.</p>
            )}
        </div>
    );
};

export default CustomerSearch;