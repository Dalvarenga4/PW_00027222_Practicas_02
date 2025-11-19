import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesReport = () => {
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sales/report');
            setReport(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching report:', error);
            setLoading(false);
        }
    };

    if (loading) return <div>Cargando reporte...</div>;

    return (
        <div>
            <h2>Reporte de Ventas por Cliente</h2>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Total Ventas</th>
                    </tr>
                </thead>
                <tbody>
                    {report.map(item => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>${parseFloat(item.total_sales).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesReport;