const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const moment = require('moment');
let today = moment().format('YYYY-MM-DD HH:mm:ss'+'+00:00');


const userGet = async(req, res = response) =>{
    const users = await User.findAll();
    res.json( users )
}
const userCreate = async(req, res = response) =>{

    const { user_name,email,password } = req.body;
    const mailexists = await userFind(email);

    if ( mailexists.length > 0 ) {
        return res.status(400).json({
            msg: 'email already registered',
            email,
        });
    }
    try {
        const user = new User({user_name,email,password});
        user.password  = await userPassworEncrypt(password);
        user.date_create = today;
        await user.save();
        res.json( {user_name,email} );
    } catch (error) {
        res.status(500).json({
            msg : 'Hable con el administrador'
        });
    }
}
const userUpdate = async(req, res = response) =>{
    const { id_user = 0,user_name = null,password=null } = req.body;

    const user = await User.findByPk( id_user );
    if (user) {
        try {
            if (user_name != null) {
                user.user_name = user_name;
            }
            if (password != null) {
                user.password  = await userPassworEncrypt(password);
            }
            await user.save();
        } catch (error) {
            res.status(500).json({
                msg : 'Hable con el administrador'
            });
        }
    }

    res.json({
        mg:'post API - controller',
        user
    })
}

const userFind = (email) =>{
    return User.findAll({
        where: { email }
     });    
}
const userPassworEncrypt = (password) =>{
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password,salt);
}



module.exports = {
    userGet,userCreate,userUpdate
}