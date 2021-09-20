const { response, request } = require('express');
const Salary = require('../models/salary');
const moment = require('moment');
let today = moment().format('YYYY-MM-DD HH:mm:ss'+'+00:00');

const salaryGet = async(req = request , resp = response ) =>{

    const salaery = await salaryGets(req.uid);
    resp.status(500).json({
        msg: 'get salary',
        salaery
    })
}

const salaryCreate = async(req = request , resp = response) =>{
    try {
        const salaeryget = await salaryGets(req.uid);
        if (!salaeryget) {  
            const salary = new Salary();
            salary.id_user = req.uid;
            salary.mount = req.body.mount;
            salary.date_create =  today;
            await salary.save();
            return resp.status(200).json({
                msg : 'se creo con exito'
                });
        }else{
            return resp.status(200).json({
                msg : 'ya cuenta con un salario'
                }); 
        }
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}

const salaryUpdate = async(req = request , resp = response) =>{
    const { id_salary,mount } = req.body;
    try {
        const salary = await Salary.findByPk(id_salary);
        salary.mount = mount;
        await salary.save();
        return resp.status(200).json({
            msg : 'se creo con exito'
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}
const salaryDelete = async(req = request , resp = response) =>{
    const { id_salary } = req.body;
    try {
        const salary = await Salary.findByPk(id_salary);
        salary.status = 0;
        await salary.save();
        return resp.status(200).json({
            msg : 'se modifico con exito'
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}
const salaryGets = (id_user) =>{
    return Salary.findOne({
        where:{
            id_user
        },
        raw:true
    });
}

module.exports ={
    salaryGet,
    salaryCreate,
    salaryUpdate,
    salaryDelete
}
