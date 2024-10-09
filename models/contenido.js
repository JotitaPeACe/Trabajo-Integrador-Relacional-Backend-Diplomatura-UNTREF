const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');  // Conexión a la base de datos

class Contenido extends Model {}

Contenido.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    categoria_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    gen: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    resumen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    temporadas: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    duracion: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    trailer: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    poster: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Contenido',
    tableName: 'contenido',  // Nombre exacto en MySQL
    timestamps: false
});

module.exports = Contenido;
