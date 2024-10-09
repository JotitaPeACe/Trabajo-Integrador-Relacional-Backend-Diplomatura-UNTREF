const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database'); // La conexión a DB

const Actor = sequelize.define('Actor', {
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
    tableName: 'actores',  // El nombre de la tabla en la base de datos
    timestamps: false,     
});

module.exports = Actor;

