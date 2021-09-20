const { response, request } = require('express');
const ControlSelect = require('../models/control-select');
const moment = require('moment');
let today = moment().format('YYYY-MM-DD HH:mm:ss'+'+00:00');

const controlselectGet = async(req = request, resp = response ) =>{
    try {
        const controlselect = await lookselect(req.uid);
         return resp.status(200).json({ controlselect });
    } catch (error) {
        return resp.status(500).json({ error });
    }
}
const controlselectCreate = async(req = request, resp = response ) =>{
    const { id_control } = req.body;
    const id_user = req.uid;

    try {
        const getcontrolselect = await lookselect(id_user);
        if ( getcontrolselect.length == 0) {
            controlselect = new ControlSelect({ id_control,id_user});
            controlselect.date_create = today;
            await controlselect.save();
        }else{
            controlselect = getcontrolselect[0];
        }

        return resp.status(200).json({ controlselect });

    } catch (error) {
        return resp.status(500).json( error )
    }
}

const controlselectUpdate = async(req = request, resp = response ) =>{
    const { id_control,id_control_select } = req.body;
    try {
        const getcontrolselect = await ControlSelect.findByPk(id_control_select);
        getcontrolselect.id_control = id_control;
        getcontrolselect.save();
    
        return resp.status(200).json({ getcontrolselect });

    } catch (error) {
        return resp.status(500).json( error )
    }
}

const controlselectDelete = async(req = request, resp = response ) =>{
    const { id_control_select } = req.body;
    try {
        const getcontrolselect = await ControlSelect.findByPk(id_control_select);
        getcontrolselect.status = 0;
        getcontrolselect.save();
    
        return resp.status(200).json({ getcontrolselect });

    } catch (error) {
        return resp.status(500).json( error )
    }
}

const lookselect = (id_user) =>{
    return ControlSelect.findAll({
        where:{
            id_user: id_user
        }
    });
}

module.exports = {
    controlselectGet,
    controlselectCreate,
    controlselectUpdate,
    controlselectDelete,
    lookselect
}