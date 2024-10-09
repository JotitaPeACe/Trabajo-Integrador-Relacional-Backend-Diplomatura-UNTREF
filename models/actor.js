const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database'); // La conexión a tu DB

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
    timestamps: false,     // Si no estás usando columnas createdAt y updatedAt
});

module.exports = Actor;

