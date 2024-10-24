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
        validate: {
            notEmpty: {
                msg: 'El nombre de la categoría no puede estar vacío',
            },
            len: {
                args: [1, 100],
                msg: 'El nombre de la categoría debe tener entre 1 y 100 caracteres',
            },
            is: {
                args: /^[a-zA-Z\s]+$/i, // Solo permite letras y espacios
                msg: 'El nombre de la categoría solo puede contener letras y espacios',
            },
        },
    },
}, {
    tableName: 'categorias',  // El nombre de la tabla en la base de datos
    timestamps: false,
});

module.exports = Categoria;