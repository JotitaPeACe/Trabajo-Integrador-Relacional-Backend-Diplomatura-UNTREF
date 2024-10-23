const express = require('express');
const app = express();
const contenidoRoutes = require('./routes/contenidoRoutes');

// Middlewares
app.use(express.json());

// Rutas
app.use('/contenido', contenidoRoutes);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});

const sequelize = require('./conexion/database');

sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch((err) => {
        console.error('Error sincronizando base de datos:', err);
    });
