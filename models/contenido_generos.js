const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');

const ContenidoGeneros = sequelize.define('contenido_generos', {
    contenido_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: 'contenido', 
            key: 'id',
        },
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El contenido_id no puede ser nulo',
            },
            isInt: {
                msg: 'El contenido_id debe ser un número entero válido',
            },
        },
    },
    genero_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: 'generos', 
            key: 'id',
        },
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El genero_id no puede ser nulo',
            },
            isInt: {
                msg: 'El genero_id debe ser un número entero válido',
            },
        },
    },
}, {
    tableName: 'contenido_generos',
    timestamps: false,
});

module.exports = ContenidoGeneros;
