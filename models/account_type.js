const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Accounttype = db.define('account_type',{
    id_account_type:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    description:{
        type: DataTypes.INTEGER
    },
    date_create:{
        type: DataTypes.DATE,
    },
    status:{
        type: DataTypes.BOOLEAN
    }
});

module.exports = Accounttype;