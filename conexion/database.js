// Importaciones
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

// Configuración de entorno
const ENV = process.env.NODE_ENV || 'local';
dotenv.config({ path: `.env.${ENV}` });

// Configuración de la base de datos
const dbConfig = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
};

// Creación de la instancia de Sequelize
const sequelize = new Sequelize(dbConfig);

// Autenticación con la base de datos
sequelize.authenticate()
    .then(() => console.log('Conectado a la base de datos de MySQL'))
    .catch((err) => console.error('No se pudo conectar a la base de datos:', err));

// Exportación de la instancia de Sequelize
module.exports = sequelize;

// // Importaciones
// const dotenv = require('dotenv');
// const { Sequelize } = require('sequelize');

// // Configuración de entorno
// const ENV = process.env.NODE_ENV || 'local';
// dotenv.config({ path: `.env.${ENV}` });

// // Configuración de la base de datos
// const dbConfig = process.env.DATABASE_URL
//     ? {
//           url: process.env.DATABASE_URL,
//           dialect: 'mysql',
//       }
//     : {
//           database: process.env.DB_NAME,
//           username: process.env.DB_USER,
//           password: process.env.DB_PASSWORD,
//           host: process.env.DB_HOST,
//           port: process.env.DB_PORT,
//           dialect: 'mysql',
//       };

// // Creación de la instancia de Sequelize
// const sequelize = new Sequelize(dbConfig);

// // Autenticación con la base de datos
// sequelize.authenticate()
//     .then(() => console.log('Conectado a la base de datos de MySQL'))
//     .catch((err) => console.error('No se pudo conectar a la base de datos:', err));

// // Exportación de la instancia de Sequelize
// module.exports = sequelize;
