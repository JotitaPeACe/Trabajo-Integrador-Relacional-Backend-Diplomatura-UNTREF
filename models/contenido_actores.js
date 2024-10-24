const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');

const ContenidoActores = sequelize.define('contenido_actores', {
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
    actor_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: 'actores', 
            key: 'id',
        },
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El actor_id no puede ser nulo',
            },
            isInt: {
                msg: 'El actor_id debe ser un número entero válido',
            },
        },
    },
}, {
    tableName: 'contenido_actores',
    timestamps: false,
});

module.exports = ContenidoActores;
