const { response, request } = require('express');
const { Op } = require("sequelize");
const Control = require('../models/control');

const controlGet = async(req , resp = response) =>{
    const arrayofTaskId = [1,req.uid];
    try {
        const control = await Control.findAll({
            where: {
              id_user: {
                [Op.in]: arrayofTaskId
              }
            }
          });
        return resp.status(200).json( {control})
        
    } catch (error) {
        return resp.status(500).json( { msg : error } )
    }
}

const controlCreate = async( req , resp = response) =>{
    const { description,basic,variable,saving } = req.body;
    const id_user = req.uid;
    try {
        const control = new Control({id_user,description,basic,variable,saving});
        await control.save();
        return resp.status(200).json({
            msg: 'create compleate'
        });
    } catch (error) {
        return resp.status(400).json({
            msg: error
        });
    }
}

const controlUpdate = async(req = request, resp = response) => {
    const { id_control,description,basic,variable,saving } = req.body;
    try {
        const control = await Control.findByPk(id_control);
        control.description = description;
        control.basic = basic;
        control.variable = variable;
        control.saving = saving;
        control.save();
        return resp.status(200).json({
            control
        });
        
    } catch (error) {
        return resp.status(400).json({
            msg: error
        });
    }
}

const controlDelete = async(req = request , resp = response) =>{
    const { id_control,validate } = req.body;
    try {
        const control = await Control.findByPk(id_control);
        control.status = validate;
        control.save();
        return resp.status(200).json({
            control
        });
        
    } catch (error) {
        return resp.status(400).json({
            msg: error
        });
    }
}

module.exports ={
    controlGet,
    controlCreate,
    controlUpdate,
    controlDelete,
}
