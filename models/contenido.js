// Importar DataTypes de Sequelize para definir los tipos de datos del modelo
const { DataTypes } = require('sequelize');
// Importar la conexión a la base de datos
const sequelize = require('../conexion/database');

// Importa los otros modelos necesarios para las relaciones
const Actor = require('./actor'); // Modelo Actor
const Genero = require('./genero'); // Modelo Genero
const Categoria = require('./categoria'); // Modelo Categoria
const ContenidoActores = require('./contenido_actores'); // Modelo intermedio para relación muchos a muchos con actores
const ContenidoGeneros = require('./contenido_generos'); // Modelo intermedio para relación muchos a muchos con géneros

// Definir el modelo 'Contenido' utilizando Sequelize
const Contenido = sequelize.define('Contenido', {
    id: {
        type: DataTypes.BIGINT, // Tipo de dato BIGINT para el ID
        autoIncrement: true, // Incremento automático del ID
        primaryKey: true, // El ID es la clave primaria
    },
    titulo: {
        type: DataTypes.STRING(255), // Tipo de dato STRING con un máximo de 255 caracteres
        allowNull: false, // No se permite que el título sea nulo
        validate: {
            notEmpty: true, // Valida que no esté vacío
            len: [2, 255]   // Longitud mínima de 2 caracteres
        }
    },
    categoria_id: {
        type: DataTypes.BIGINT, // Tipo de dato BIGINT para el ID de la categoría
        allowNull: false, // No se permite que sea nulo
        validate: {
            isInt: true, // Valida que sea un entero
            notNull: { msg: 'La categoría es obligatoria' } // Mensaje de error si es nulo
        }
    },
    gen: {
        type: DataTypes.STRING(100), // Tipo de dato STRING con un máximo de 100 caracteres
        allowNull: false, // No se permite que sea nulo
        validate: {
            notEmpty: true, // Valida que no esté vacío
        }
    },
    resumen: {
        type: DataTypes.TEXT, // Tipo de dato TEXT para el resumen
        allowNull: false, // No se permite que sea nulo
        validate: {
            notEmpty: true, // Valida que no esté vacío
            len: [10, 5000]  // Longitud mínima de 10 caracteres y máxima de 5000
        }
    },
    temporadas: {
        type: DataTypes.STRING(50), // Tipo de dato STRING con un máximo de 50 caracteres
        allowNull: true, // Se permite que sea nulo
    },
    duracion: {
        type: DataTypes.STRING(50), // Tipo de dato STRING con un máximo de 50 caracteres
        allowNull: true, // Se permite que sea nulo
    },
    trailer: {
        type: DataTypes.STRING(255), // Tipo de dato STRING con un máximo de 255 caracteres
        allowNull: false, // No se permite que sea nulo
        validate: {
            isUrl: true, // Valida que sea una URL válida
            notEmpty: true // Valida que no esté vacío
        }
    },
    poster: {
        type: DataTypes.STRING(255), // Tipo de dato STRING con un máximo de 255 caracteres
        allowNull: false, // No se permite que sea nulo
        validate: {
            isUrl: true, // Valida que sea una URL válida
            notEmpty: true // Valida que no esté vacío
        }
    },
}, {
    // Opciones adicionales del modelo
    tableName: 'contenido', // Nombre de la tabla en la base de datos
    timestamps: false, // No se generan campos de timestamps (createdAt, updatedAt)
});

// Relación entre Contenido y Actor (Muchos a Muchos)
Contenido.belongsToMany(Actor, {
    through: ContenidoActores, // Modelo intermedio
    foreignKey: 'contenido_id', // Clave foránea en la tabla intermedia
});

// Relación inversa: Actor a Contenido
Actor.belongsToMany(Contenido, {
    through: ContenidoActores, // Modelo intermedio
    foreignKey: 'actor_id', // Clave foránea en la tabla intermedia
});

// Relación entre Contenido y Genero (Muchos a Muchos)
Contenido.belongsToMany(Genero, {
    through: ContenidoGeneros, // Modelo intermedio
    foreignKey: 'contenido_id', // Clave foránea en la tabla intermedia
});

// Relación inversa: Genero a Contenido
Genero.belongsToMany(Contenido, {
    through: ContenidoGeneros, // Modelo intermedio
    foreignKey: 'genero_id', // Clave foránea en la tabla intermedia
});

// Relación entre Contenido y Categoria (Uno a Muchos)
Contenido.belongsTo(Categoria, {
    foreignKey: 'categoria_id', // Clave foránea en la tabla de contenido
});

// Relación inversa: Categoria a Contenido
Categoria.hasMany(Contenido, {
    foreignKey: 'categoria_id', // Clave foránea en la tabla de contenido
});

// Exportar el modelo 'Contenido' para ser utilizado en otras partes de la aplicación
module.exports = Contenido;
