import express from 'express';
import cors from 'cors';
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de SQL Server
const dbConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'tu_password',
  server: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'MiniproyectoDB',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

// Conexión a la base de datos
let pool;

const connectDB = async () => {
  try {
    pool = await sql.connect(dbConfig);
    console.log('Conectado a SQL Server');
  } catch (error) {
    console.error('Error conectando a SQL Server:', error);
  }
};

connectDB();

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({
    message: 'API funcionando correctamente',
    endpoints: {
      customers: '/api/customers',
      sales: '/api/sales',
      salesReport: '/api/sales/report'
    }
  });
});

// Ejercicio 2: Listado básico de clientes
app.get('/api/customers', async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM customers ORDER BY id');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ejercicio 3: Registrar una nueva venta
app.post('/api/sales', async (req, res) => {
  const { amount, id_customer } = req.body;

  try {
    // Validar que el cliente existe
    const customerCheck = await pool.request()
      .input('id_customer', sql.Int, id_customer)
      .query('SELECT id FROM customers WHERE id = @id_customer');

    if (customerCheck.recordset.length === 0) {
      return res.status(400).json({ error: 'Cliente no encontrado' });
    }

    // Insertar la venta
    const result = await pool.request()
      .input('amount', sql.Decimal(10, 2), amount)
      .input('id_customer', sql.Int, id_customer)
      .query('INSERT INTO sales (amount, id_customer) OUTPUT INSERTED.* VALUES (@amount, @id_customer)');

    res.status(201).json({
      message: 'Venta registrada exitosamente',
      sale: result.recordset[0]
    });
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ejercicio 4: Listar ventas con datos del cliente
app.get('/api/sales', async (req, res) => {
  try {
    const result = await pool.request().query(`
      SELECT s.id, s.amount, s.created_at, c.name as customer_name
      FROM sales s
      JOIN customers c ON s.id_customer = c.id
      ORDER BY s.created_at DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ejercicio 5: Buscar clientes por código
app.get('/api/customers/search', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Parámetro code es requerido' });
  }

  try {
    const result = await pool.request()
      .input('code', sql.NVarChar(50), code)
      .query('SELECT * FROM customers WHERE code = @code');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error searching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ejercicio 6: Reporte de ventas por cliente
app.get('/api/sales/report', async (req, res) => {
  try {
    const result = await pool.request().query(`
      SELECT c.name, SUM(s.amount) AS total_sales
      FROM sales s
      JOIN customers c ON s.id_customer = c.id
      GROUP BY c.name
      ORDER BY total_sales DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error generating sales report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});