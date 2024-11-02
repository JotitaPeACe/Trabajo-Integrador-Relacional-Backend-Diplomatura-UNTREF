const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'TrailerFlix API',
            version: '1.0.0',
            description: 'Documentación de la API para el proyecto TrailerFlix',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                url: 'https://trabajo-integrador-relacional-backend.onrender.com/'
            },
        ],
    },
    apis: ['./routes/contenidoRoutes.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
