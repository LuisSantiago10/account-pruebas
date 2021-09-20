const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const User = db.define('user',{
    id_user:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user_name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    date_create:{
        type: DataTypes.DATE
    },
    status:{
        type: DataTypes.BOOLEAN
    }
});

module.exports = User;
