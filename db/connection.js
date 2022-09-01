const Sequelize = require('sequelize');

// using Sequelize to connect to database and perform operations without writing SQL queries.
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/app.db'
});

module.exports = sequelize