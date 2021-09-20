const { Sequelize } = require('sequelize');
const { BD_HOST,BD_USER,BD_PASSWORD,BD_DATABASE } = process.env;

const db = new Sequelize(BD_DATABASE,BD_USER,BD_PASSWORD,{
    host: BD_HOST,
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true,
      },
      // operatorsAliases:0,
      // timezone:"+00:00"
    // logging: false
});

module.exports = db;