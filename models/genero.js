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
        unique: {
            msg: 'El género debe ser único'
        },
        validate: {
            notEmpty: {
                msg: 'El nombre del género no puede estar vacío'
            },
            len: {
                args: [3, 100],
                msg: 'El nombre del género debe tener entre 3 y 100 caracteres'
            },
            isAlpha: {
                msg: 'El nombre del género solo puede contener letras'
            }
        }
    }
}, {
    tableName: 'generos',
    timestamps: false,
});

module.exports = Genero;