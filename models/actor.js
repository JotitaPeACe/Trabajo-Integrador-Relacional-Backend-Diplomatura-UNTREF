// Model for Actor
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');  

const Actor = sequelize.define('Actor', {
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
  tableName: 'actores', 
  timestamps: false      
});

