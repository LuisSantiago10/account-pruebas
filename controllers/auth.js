const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async(req, res= response) =>{

    const { email,password } = req.body;

    try {
        const user = await User.findOne({
            raw:true,
            where: { email }
         });

        if (!user) {
            return res.status(400).json({
                msg:'User / password  incorrectos correo'
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg:'User / password  incorrectos estado'
            });
        }

        const validate = bcryptjs.compareSync(password,user.password);
        if (!validate) {
            return res.status(400).json({
                msg:'User / password  incorrectos password'
            });
        }

      const token = await generateJWT(user.id_user);

        res.json({
            user,
            token
        });        
    } catch (error) {
        return res.status(400).json({
            msg:'paso un erro',
        });
    }
}

module.exports = {
    login
}