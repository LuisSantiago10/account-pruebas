const { response, request } = require('express');
const Movements = require('../models/movements');
const moment = require('moment');
const Account = require('../models/account');
const Month = require('../models/month');
let date_create = moment().format('YYYY-MM-DD');
let date_time = moment().format('HH:mm:ss');

const movementsGet = async(req = request , resp = response) =>{

    const movements = await MovementsGets(req.uid);
    resp.status(500).json({
        msg: 'get movements',
        movements
    })
}

const movementsCreate = async(req = request , resp = response) =>{
    const { id_month,id_account,description,amount,type } = req.body;
    let msg = '', data = {};
    try {
        const validation = await MovementsES(id_account,amount,type);
        if (validation.status) {
            const movements = new Movements({
                id_month,id_account,description,amount,type,date_create,date_time
            });
            await movements.save();
            msg = 'create compleate';
            data = movements;
        }else{
            msg = validation.msg,
            data = validation.data
        }

        return resp.status(200).json({
            msg,data
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}

const movementsDelete = async(req = request , resp = response) =>{
    const { id_movements,id_month,id_account,amount,type } = req.body;
    let msg = 'month closing', data = {};
    let typeReturn = (type == 1) ? 0 : 1;

    try {        
        const month = await Month.findByPk(id_month);
        if (month.closing == 0) {
            const validation = await MovementsES(id_account,amount,typeReturn);
            if (validation.status) {
                const movements = await Movements.findByPk(id_movements);
                movements.status = 0;
                movements.save();
                msg = 'create compleate';
                data = movements;
            }else{
                msg = validation.msg,
                data = validation.data
            }   
        }
    
        return resp.status(200).json({
            msg,data
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}

const MovementsGets = (id_user) =>{
    return Movements.findAll({
        // where:{
        //     id_user
        // },
        raw:true
    });
}
const MovementsES = async (id_account,amount,type) => {
    let valida = {};
    const account = await AccountGets(id_account);
    const validAccount = ValidateAccount(account);
    if (validAccount.status) {
        switch (type) {
            case 0:
                valida = MovementsS(account,amount);
                break;
            case 1:
                valida = MovementsE(account,amount);
                break;
            default:
                valida = {msg:'error in the validation type account',data:{},status:false}
                break;
        }        
    }else{
        valida.msg = validAccount.msg
        valida.data = {};
        valida.status = false;
    }
    return valida;
}

const MovementsS = async(account,amount) =>{
    let validate;
    if (amount > account.amount) {
        validate = { msg:'no founds in th account',data : account,status:false }
    }else{
        account.amount -= amount;
        await account.save();
        validate = { msg:'save update account', data: account,status:true }
    }
    return validate;
}

const MovementsE = async (account,amount) =>{
    account.amount += amount;
    await account.save();
    validate = { msg:'save update account', data: account,status:true }
    return validate;
}

const AccountGets = (id_account) =>{
    return  Account.findByPk(id_account);
}
const ValidateAccount = (account) =>{
    let result = {};
    if (account) {
        if (account.status == 1) {
            result = { msg:'the account correct', status : true }
        }else{
            result = { msg:'the account desabled',status : false }
        }
    }else{
        result = { msg:'the account not fail', status : false}
    }
    return result;
}
module.exports ={
    movementsGet,
    movementsCreate,
    movementsDelete
}
