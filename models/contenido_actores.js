// Importar DataTypes de Sequelize para definir los tipos de datos del modelo
const { DataTypes } = require('sequelize');
// Importar la conexión a la base de datos
const sequelize = require('../conexion/database');

// Definir el modelo 'contenido_actores' utilizando Sequelize
const ContenidoActores = sequelize.define('contenido_actores', {
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
    actor_id: {
        // Definición del campo 'actor_id'
        type: DataTypes.BIGINT, // Tipo de dato BIGINT para el ID del actor
        primaryKey: true, // El actor_id es parte de la clave primaria
        references: {
            // Definir la relación con el modelo 'actores'
            model: 'actores', // Nombre del modelo referenciado
            key: 'id', // Campo del modelo referenciado
        },
        allowNull: false, // No se permite que el actor_id sea nulo
        validate: {
            // Validaciones para el campo 'actor_id'
            notNull: {
                msg: 'El actor_id no puede ser nulo', // Mensaje de error si es nulo
            },
            isInt: {
                msg: 'El actor_id debe ser un número entero válido', // Mensaje de error si no es un entero
            },
        },
    },
}, {
    // Opciones adicionales del modelo
    tableName: 'contenido_actores', // Nombre de la tabla en la base de datos
    timestamps: false, // No se generan campos de timestamps (createdAt, updatedAt)
});

// Exportar el modelo 'ContenidoActores' para ser utilizado en otras partes de la aplicación
module.exports = ContenidoActores;

