const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('trailerflix', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Connected to MySQL database'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
