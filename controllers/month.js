const { response, request } = require('express');
const Month = require('../models/month');
const ControlSelect = require('../models/control-select');
const moment = require('moment');
let today = moment().format('YYYY-MM-DD HH:mm:ss'+'+00:00');
let day_month = moment().format('M');
let year = moment().year();

const monthGet = async(req = request, resp = response) => {

    try {
        const control_select = await ControlSelect.findOne({
            where:{
                id_user: req.uid
            },
            raw:true
        });
        if (control_select) {
            
            const monthget = await monthGets(year,day_month,req.uid);
            if (!monthget) {
                const month = new Month();
                month.id_user = req.uid;
                month.id_control = control_select.id_control;
                month.day_month = day_month;
                month.year =  year;
                month.date_create =  today;
                await month.save();
                return resp.status(200).json({
                    msg : 'se creo con exito'
                    });
            }else{
                return resp.status(400).json({
                    msg : 'ya exista generado el mes'
                    });
            }
        }else{
            return resp.status(400).json({
                msg : 'no hay ningun control seleccionado'
                });
        }

    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}
const monthDelete = async(req = request, resp = response) =>{
    const { id_month } = req.body;
    try {
        const month = await Month.findByPk(id_month);
        month.status = 0;
        month.save();
        return resp.status(200).json({
            msg : 'delete sufulcce'
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}

const monthGets = (year,day_month,id_user) =>{
    return Month.findOne({
        where:{
            year,
            day_month,
            id_user
        },
        raw:true
    });
}

module.exports = {
    monthGet,
    monthDelete
}