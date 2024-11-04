// Importar las librerías necesarias para Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de las opciones de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        // Definir la versión de OpenAPI utilizada
        openapi: '3.0.0',
        info: {
            title: 'TrailerFlix API', // Título de la API
            version: '1.0.0', // Versión de la API
            description: 'Documentación de la API para el proyecto TrailerFlix', // Descripción de la API
        },
        servers: [
            {
                // Lista de servidores donde la API puede estar disponible
                url: 'http://localhost:3000', // URL local para pruebas
                url: 'https://trabajo-integrador-relacional-backend.onrender.com/' // URL de producción
            },
        ],
    },
    // Especificar la ruta a los archivos de las rutas donde están definidas las API
    apis: ['./routes/contenidoRoutes.js'],
};

// Generar la documentación de Swagger utilizando las opciones definidas
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Exportar el módulo para que pueda ser utilizado en otros archivos
module.exports = { swaggerUi, swaggerDocs };
