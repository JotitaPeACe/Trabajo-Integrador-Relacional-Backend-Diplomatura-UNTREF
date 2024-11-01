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
                url: 'http://localhost:3000', // Cambia a la URL de Railway una vez desplegado
            },
        ],
    },
    apis: ['./routes/*.js'], // Ruta donde tienes tus archivos de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
