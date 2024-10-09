const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database'); // La conexión a DB

const Categoria = sequelize.define('Categoria', {
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
    tableName: 'categorias',
    timestamps: false,
});

module.exports = Categoria;
