const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Month = db.define('month',{
    id_month:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_user:{
        type: DataTypes.INTEGER
    },
    id_control:{
        type: DataTypes.INTEGER
    },
    day_month:{
        type: DataTypes.INTEGER
    },
    year:{
        type: DataTypes.INTEGER
    },
    date_create:{
        type: DataTypes.DATE,
    },
    closing:{
        type: DataTypes.BOOLEAN
    },
    status:{
        type: DataTypes.BOOLEAN
    }
});

module.exports = Month;