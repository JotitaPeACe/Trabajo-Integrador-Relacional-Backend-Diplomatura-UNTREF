const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');

const Genero = sequelize.define('Genero', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'generos',
    timestamps: false,
});

module.exports = Genero;
