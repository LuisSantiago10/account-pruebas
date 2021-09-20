const { request, response } = require("express");
const { decryptToken } = require('../helpers/generate-jwt');

// const jwt = require('jsonwebtoken');

const validatorJWT = (req = request,res = response,next) =>{
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({
            msg: ' no hay token en la peticion'
        });
    }

    try {
        
        const { uid } = decryptToken( token );
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: ' no hay token en la peticion'
        });      
    }
}

module.exports = {
    validatorJWT
}