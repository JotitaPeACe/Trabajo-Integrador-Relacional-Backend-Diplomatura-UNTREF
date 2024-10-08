// Model for Genero
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');

const Genero = sequelize.define('Genero', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(100),  
    allowNull: false  
  }
}, {
  tableName: 'generos', 
  timestamps: false
});

module.exports = Genero;
