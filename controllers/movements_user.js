const { response, request } = require('express');
const MovementsUser = require('../models/movements_user');
const moment = require('moment');
let today = moment().format('YYYY-MM-DD HH:mm:ss'+'+00:00');

const movementsUserGet = async(req = request , resp = response ) =>{

    const movements_user = await movementsUserGets(req.uid);
    resp.status(500).json({
        msg: 'get movements',
        movements_user
    })
}

const movementsUserCreate = async(req = request , resp = response) =>{

    const { id_account,description,amount } = req.body;

    try {
        const movents_user = new MovementsUser();
        movents_user.id_account = id_account;
        movents_user.description = description;
        movents_user.amount = amount;
        movents_user.date_create =  today;
        await movents_user.save();
        return resp.status(200).json({
            msg : 'se creo con exito'
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}

const movenmentsUserUpdate = async(req = request , resp = response) =>{
    const { id_account,description,amount,id_movement_user } = req.body;
    try {
        const movents_user = await MovementsUser.findByPk(id_movement_user);
        movents_user.id_account = id_account;
        movents_user.description = description;
        movents_user.amount = amount;
        await movents_user.save();
        return resp.status(200).json({
            msg : 'se creo con exito'
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}
const movementsUserDelete = async(req = request , resp = response) =>{
    const { id_movement_user } = req.body;
    try {
        const movents_user = await MovementsUser.findByPk(id_movement_user);
        movents_user.status = 0;
        await movents_user.save();
        return resp.status(200).json({
            msg : 'se modifico con exito'
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}
const movementsUserGets = (id_user) =>{
    return MovementsUser.findAll({
        // where:{
        //     id_user
        // },
        raw:true
    });
}

module.exports ={
    movementsUserGet,
    movementsUserCreate,
    movenmentsUserUpdate,
    movementsUserDelete
}
