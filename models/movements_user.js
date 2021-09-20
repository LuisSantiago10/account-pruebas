const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const MovementsUser = db.define('movements_user',{
    id_movement_user:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
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
    date_create:{
        type: DataTypes.DATE
    },
    status:{
        type: DataTypes.BOOLEAN
    }
});

module.exports = MovementsUser;