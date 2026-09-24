const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const productosRoutes = require('./routes/productos.routes');
const clientesRoutes = require('./routes/clientes.routes');
const pedidosRoutes = require('./routes/pedidos.routes');

const app = express();
app.use(express.json());

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Taller 4 - Cliente Servidor',
      version: '1.0.0',
      description: 'Documentación de los módulos nuevos',
    },
  },
  apis: ['./routes/*.js'], // lee los comentarios @swagger de todas las rutas
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas nuevas
app.use('/api/productos', productosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/pedidos', pedidosRoutes);

module.exports = app;
