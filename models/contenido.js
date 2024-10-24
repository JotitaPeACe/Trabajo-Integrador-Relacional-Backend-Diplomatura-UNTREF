const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');

// Importa los otros modelos necesarios
const Actor = require('./actor');
const Genero = require('./genero');
const Categoria = require('./categoria');
const ContenidoActores = require('./contenido_actores');  // Modelo intermedio
const ContenidoGeneros = require('./contenido_generos');  // Modelo intermedio

const Contenido = sequelize.define('Contenido', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true, // Valida que no esté vacío
            len: [2, 255]   // Longitud mínima de 2 caracteres
        }
    },
    categoria_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            isInt: true, // Valida que sea un entero
            notNull: { msg: 'La categoría es obligatoria' }
        }
    },
    gen: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true, // Valida que no esté vacío
        }
    },
    resumen: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true, // Valida que no esté vacío
            len: [10, 5000]  // Longitud mínima y máxima
        }
    },
    temporadas: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    duracion: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    trailer: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isUrl: true, // Valida que sea una URL válida
            notEmpty: true
        }
    },
    poster: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isUrl: true, // Valida que sea una URL válida
            notEmpty: true
        }
    },
}, {
    tableName: 'contenido',
    timestamps: false,
});

// Relación entre Contenido y Actor (Muchos a Muchos)
Contenido.belongsToMany(Actor, {
    through: ContenidoActores,
    foreignKey: 'contenido_id',
});

Actor.belongsToMany(Contenido, {
    through: ContenidoActores,
    foreignKey: 'actor_id',
});

// Relación entre Contenido y Genero (Muchos a Muchos)
Contenido.belongsToMany(Genero, {
    through: ContenidoGeneros,
    foreignKey: 'contenido_id',
});

Genero.belongsToMany(Contenido, {
    through: ContenidoGeneros,
    foreignKey: 'genero_id',
});

// Relación entre Contenido y Categoria (Uno a Muchos)
Contenido.belongsTo(Categoria, {
    foreignKey: 'categoria_id',
});

Categoria.hasMany(Contenido, {
    foreignKey: 'categoria_id',
});

module.exports = Contenido;
