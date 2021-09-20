const { response, request } = require('express');
const AccountType = require('../models/account_type');
const moment = require('moment');
let today = moment().format('YYYY-MM-DD HH:mm:ss'+'+00:00');

const accountTypeGet = async(req = request , resp = response) =>{

    const accounttype = await AccountTypeGets(req.uid);
    resp.status(500).json({
        msg: 'get salary',
        accounttype
    })
}

const accountTypeCreate = async(req = request , resp = response) =>{
    const { description } = req.body;
    try {
        const accounttype = new AccountType();
        accounttype.description = description;
        accounttype.date_create =  today;
        await accounttype.save();
        return resp.status(200).json({
            msg : 'se creo con exito'
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}

const accountTypeUpdate = async(req = request , resp = response) =>{
    const { id_account_type,description } = req.body;
    try {
        const accounttype = await AccountType.findByPk(id_account_type);
        accounttype.description = description;
        await accounttype.save();
        return resp.status(200).json({
            msg : 'se creo con exito'
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}
const accountTypeDelete = async(req = request , resp = response) =>{
    const { id_account_type } = req.body;
    try {
        const accounttype = await AccountType.findByPk(id_account_type);
        accounttype.status = 0;
        await accounttype.save();
        return resp.status(200).json({
            msg : 'se modifico con exito'
            });
    } catch (error) {
        return resp.status(400).json({
            error
            });
    }
}
const AccountTypeGets = (id_user) =>{
    return AccountType.findAll({
        // where:{
        //     id_user
        // },
        raw:true
    });
}

module.exports ={
    accountTypeGet,
    accountTypeCreate,
    accountTypeUpdate,
    accountTypeDelete
}
