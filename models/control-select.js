const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const ControlSelect = db.define('control_select',{
    id_control_select:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_control:{
        type: DataTypes.INTEGER
    },
    id_user:{
        type: DataTypes.INTEGER
    },
    date_create:{
        type: DataTypes.DATE,
    },
    status:{
        type: DataTypes.BOOLEAN
    }
});

module.exports = ControlSelect;