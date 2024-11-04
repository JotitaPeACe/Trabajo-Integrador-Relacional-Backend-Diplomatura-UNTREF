// Importar DataTypes de Sequelize para definir los tipos de datos del modelo
const { DataTypes } = require('sequelize');
// Importar la conexión a la base de datos
const sequelize = require('../conexion/database');

// Definir el modelo 'contenido_generos' utilizando Sequelize
const ContenidoGeneros = sequelize.define('contenido_generos', {
    contenido_id: {
        // Definición del campo 'contenido_id'
        type: DataTypes.BIGINT, // Tipo de dato BIGINT para el ID del contenido
        primaryKey: true, // El contenido_id es parte de la clave primaria
        references: {
            // Definir la relación con el modelo 'contenido'
            model: 'contenido', // Nombre del modelo referenciado
            key: 'id', // Campo del modelo referenciado
        },
        allowNull: false, // No se permite que el contenido_id sea nulo
        validate: {
            // Validaciones para el campo 'contenido_id'
            notNull: {
                msg: 'El contenido_id no puede ser nulo', // Mensaje de error si es nulo
            },
            isInt: {
                msg: 'El contenido_id debe ser un número entero válido', // Mensaje de error si no es un entero
            },
        },
    },
    genero_id: {
        // Definición del campo 'genero_id'
        type: DataTypes.BIGINT, // Tipo de dato BIGINT para el ID del género
        primaryKey: true, // El genero_id es parte de la clave primaria
        references: {
            // Definir la relación con el modelo 'generos'
            model: 'generos', // Nombre del modelo referenciado
            key: 'id', // Campo del modelo referenciado
        },
        allowNull: false, // No se permite que el genero_id sea nulo
        validate: {
            // Validaciones para el campo 'genero_id'
            notNull: {
                msg: 'El genero_id no puede ser nulo', // Mensaje de error si es nulo
            },
            isInt: {
                msg: 'El genero_id debe ser un número entero válido', // Mensaje de error si no es un entero
            },
        },
    },
}, {
    // Opciones adicionales del modelo
    tableName: 'contenido_generos', // Nombre de la tabla en la base de datos
    timestamps: false, // No se generan campos de timestamps (createdAt, updatedAt)
});

// Exportar el modelo 'ContenidoGeneros' para ser utilizado en otras partes de la aplicación
module.exports = ContenidoGeneros;
