// Importar DataTypes de Sequelize para definir los tipos de datos del modelo
const { DataTypes } = require('sequelize');
// Importar la conexión a la base de datos
const sequelize = require('../conexion/database'); // La conexión a DB

// Definir el modelo 'Categoria' utilizando Sequelize
const Categoria = sequelize.define('Categoria', {
    id: {
        // Definición del campo 'id'
        type: DataTypes.BIGINT, // Tipo de dato BIGINT para el ID
        autoIncrement: true, // Incremento automático del ID
        primaryKey: true, // El ID es la clave primaria
    },
    nombre: {
        // Definición del campo 'nombre'
        type: DataTypes.STRING(100), // Tipo de dato STRING con un máximo de 100 caracteres
        allowNull: false, // No se permite que el nombre sea nulo
        validate: {
            // Validaciones para el campo 'nombre'
            notEmpty: {
                msg: 'El nombre de la categoría no puede estar vacío', // Mensaje de error si está vacío
            },
            len: {
                args: [1, 100], // Longitud permitida entre 1 y 100 caracteres
                msg: 'El nombre de la categoría debe tener entre 1 y 100 caracteres', // Mensaje de error si no cumple la longitud
            },
            is: {
                // Validación mediante expresión regular
                args: /^[a-zA-Z\s]+$/i, // Solo permite letras y espacios
                msg: 'El nombre de la categoría solo puede contener letras y espacios', // Mensaje de error si contiene caracteres no válidos
            },
        },
    },
}, {
    tableName: 'categorias',  // Nombre de la tabla en la base de datos
    timestamps: false, // No se generan campos de timestamps (createdAt, updatedAt)
});

// Exportar el modelo 'Categoria' para ser utilizado en otras partes de la aplicación
module.exports = Categoria;
