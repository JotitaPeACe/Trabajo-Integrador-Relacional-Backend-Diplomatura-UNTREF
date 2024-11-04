// Importar DataTypes de Sequelize para definir los tipos de datos del modelo
const { DataTypes } = require('sequelize');
// Importar la conexión a la base de datos
const sequelize = require('../conexion/database');

// Definir el modelo 'Genero' utilizando Sequelize
const Genero = sequelize.define('Genero', {
    id: {
        type: DataTypes.BIGINT, // Tipo de dato BIGINT para el ID
        autoIncrement: true, // Incremento automático del ID
        primaryKey: true, // El ID es la clave primaria
    },
    nombre: {
        type: DataTypes.STRING(100), // Tipo de dato STRING con un máximo de 100 caracteres
        allowNull: false, // No se permite que el nombre sea nulo
        unique: {
            msg: 'El género debe ser único' // Mensaje de error si el género no es único
        },
        validate: {
            notEmpty: {
                msg: 'El nombre del género no puede estar vacío' // Mensaje de error si está vacío
            },
            len: {
                args: [3, 100], // Longitud mínima de 3 y máxima de 100 caracteres
                msg: 'El nombre del género debe tener entre 3 y 100 caracteres' // Mensaje de error si la longitud es incorrecta
            },
            isAlpha: {
                msg: 'El nombre del género solo puede contener letras' // Mensaje de error si contiene caracteres no alfabéticos
            }
        }
    }
}, {
    // Opciones adicionales del modelo
    tableName: 'generos', // Nombre de la tabla en la base de datos
    timestamps: false, // No se generan campos de timestamps (createdAt, updatedAt)
});

// Exportar el modelo 'Genero' para ser utilizado en otras partes de la aplicación
module.exports = Genero;
