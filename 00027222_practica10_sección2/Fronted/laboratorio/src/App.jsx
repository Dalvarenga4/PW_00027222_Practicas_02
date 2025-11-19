import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerList from './components/CustomerList';
import SalesList from './components/SalesList';
import SalesForm from './components/SalesForm';
import CustomerSearch from './components/CustomerSearch';
import SalesReport from './components/SalesReport';
import './App.css';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [activeTab, setActiveTab] = useState('customers');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Ventas</h1>
        <nav>
          <button onClick={() => setActiveTab('customers')}>Clientes</button>
          <button onClick={() => setActiveTab('sales')}>Ventas</button>
          <button onClick={() => setActiveTab('newSale')}>Nueva Venta</button>
          <button onClick={() => setActiveTab('search')}>Buscar Cliente</button>
          <button onClick={() => setActiveTab('report')}>Reporte</button>
        </nav>
      </header>

      <main>
        {activeTab === 'customers' && <CustomerList />}
        {activeTab === 'sales' && <SalesList />}
        {activeTab === 'newSale' && <SalesForm />}
        {activeTab === 'search' && <CustomerSearch />}
        {activeTab === 'report' && <SalesReport />}
      </main>
    </div>
  );
}

export default App;