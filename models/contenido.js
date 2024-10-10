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
    },
    categoria_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    gen: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    resumen: {
        type: DataTypes.TEXT,
        allowNull: false,
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
    },
    poster: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
