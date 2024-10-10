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
    },
    genero_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: 'generos', 
            key: 'id',
        },
    },
}, {
    tableName: 'contenido_generos',
    timestamps: false,
});

module.exports = ContenidoGeneros;
