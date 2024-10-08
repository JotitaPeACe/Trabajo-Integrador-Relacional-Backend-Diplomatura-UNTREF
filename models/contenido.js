// Model for Contenido
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');  

const Contenido = sequelize.define('Contenido', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
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
  tableName: 'contenido', 
  timestamps: false       
});

module.exports = Contenido;