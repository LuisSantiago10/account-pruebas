const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Movements = db.define('movements',{
    id_movements:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_month:{
        type: DataTypes.INTEGER
    },
    id_account:{
        type: DataTypes.INTEGER
    },
    description:{
        type: DataTypes.STRING
    },
    amount:{
        type: DataTypes.INTEGER
    },
    type:{
        type: DataTypes.BOOLEAN
    },
    date_create:{
        type: DataTypes.DATE,
    },
    date_time:{
        type: DataTypes.TIME,
    },
    status:{
        type: DataTypes.BOOLEAN
    }
});

module.exports = Movements;