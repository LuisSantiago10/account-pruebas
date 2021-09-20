const { response, request } = require('express');
const Account = require('../models/account');
const moment = require('moment');
let today = moment().format('YYYY-MM-DD HH:mm:ss'+'+00:00');

const accountGet = async(req = request , resp = response) =>{

    const account = await AccountGets(req.uid);
    resp.status(500).json({
        msg: 'get account',
        account
    })
}

const accountCreate = async(req = request , resp = response) =>{
    const { description,amount,id_account_type } = req.body;
    try {
        const account = new Account();
        account.description = description;
        account.amount = amount;
        account.id_account_type = id_account_type;
        account.id_user = req.uid;
        account.date_create =  today;
        await account.save();
        return resp.status(200).json({
            msg : 'se creo con exito'
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}

const accountUpdate = async(req = request , resp = response) =>{
    const { description,amount,id_account_type,id_account } = req.body;
    try {
        const account = await Account.findByPk(id_account);
        account.description = description;
        account.amount = amount;
        account.id_account_type = id_account_type;
        account.id_user = req.id_user;
        await account.save();
        return resp.status(200).json({
            msg : 'se creo con exito'
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}
const accountDelete = async(req = request , resp = response) =>{
    const { id_account } = req.body;
    try {
        const account = await Account.findByPk(id_account);
        account.status = 0;
        await account.save();
        return resp.status(200).json({
            msg : 'se modifico con exito'
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}
const AccountGets = (id_user) =>{
    return Account.findAll({
        where:{
            id_user
        },
        raw:true
    });
}

module.exports ={
    accountGet,
    accountCreate,
    accountUpdate,
    accountDelete
}
