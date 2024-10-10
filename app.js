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
    console.log(`Server is running on http://localhost:${PORT}`);
});

const sequelize = require('./conexion/database');

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
