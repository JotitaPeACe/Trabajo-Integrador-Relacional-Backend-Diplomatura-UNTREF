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
    },
    actor_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: 'actores', 
            key: 'id',
        },
    },
}, {
    tableName: 'contenido_actores',
    timestamps: false,
});

module.exports = ContenidoActores;
