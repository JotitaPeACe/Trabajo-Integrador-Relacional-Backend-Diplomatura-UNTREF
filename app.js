// Importaciones principales
const express = require('express');
const app = express();
const contenidoRoutes = require('./routes/contenidoRoutes');
const { swaggerUi, swaggerDocs } = require('./config/swagger'); // Importa Swagger

// Middlewares
app.use(express.json());

// Documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de la API
app.use('/contenido', contenidoRoutes);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});

// Conexión a la base de datos
const sequelize = require('./conexion/database');

sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch((err) => {
        console.error('Error sincronizando base de datos:', err);
    });