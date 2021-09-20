const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Salary = db.define('salary',{
    id_salary:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_user:{
        type: DataTypes.INTEGER
    },
    mount:{
        type: DataTypes.INTEGER
    },
    date_create:{
        type: DataTypes.DATE,
    },
    status:{
        type: DataTypes.BOOLEAN
    }
});

module.exports = Salary;