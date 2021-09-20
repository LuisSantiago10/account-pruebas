const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Account = db.define('account',{
    id_account:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_user:{
        type: DataTypes.INTEGER
    },
    id_account_type:{
        type: DataTypes.INTEGER
    },
    description:{
        type : DataTypes.STRING
    },
    amount:{
        type: DataTypes.FLOAT
    },
    date_create:{
        type: DataTypes.DATE,
    },
    status:{
        type: DataTypes.BOOLEAN
    }
});

module.exports = Account;