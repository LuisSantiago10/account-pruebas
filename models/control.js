const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Control = db.define('control',{
    id_control:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_user:{
        type: DataTypes.INTEGER
    },
    description:{
        type: DataTypes.STRING
    },
    basic:{
        type: DataTypes.STRING
    },
    variable:{
        type: DataTypes.STRING
    },
    saving:{
        type: DataTypes.STRING
    },
    date_create:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status:{
        type: DataTypes.BOOLEAN
    }
});

module.exports = Control;