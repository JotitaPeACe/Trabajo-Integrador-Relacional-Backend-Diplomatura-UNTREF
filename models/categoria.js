// Model for Categoria
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');

const Categoria = sequelize.define('Categoria', {
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
  tableName: 'categorias',
  timestamps: false        
});

module.exports = Categoria;
