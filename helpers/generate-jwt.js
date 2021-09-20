const jwt = require('jsonwebtoken');

const generateJWT = (uid='') =>{
    return new Promise((resolve,reject) => {
        const payload = { uid };
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            // expiresIn:'4h'
        },(err,token) => {
            if (err) {
                console.log(err);
                reject('no se pudo generar')
            }else{
                resolve(token);
            }
        })
    })
}

const decryptToken = (token ='') => {
    return jwt.verify( token, process.env.SECRETORPRIVATEKEY);
}

module.exports ={
    generateJWT,
    decryptToken
}