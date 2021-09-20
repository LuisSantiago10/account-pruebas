const express = require('express');
const cors = require('cors');
const db = require('../db/connection');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        // this.usuarioPath = '/api/usuarios';
        // this.authPath = '/api/auth';
        this.path ={
            'user' : '/api/usuarios',
            'auth' : '/api/auth',
            'control' : '/api/control',
            'selected' : '/api/selected',
            'month' : '/api/month',
            'salary' : '/api/salary',
            'account_type' : '/api/account-type',
            'account' : '/api/account',
            'movements_user' : '/api/movements-user',
            'movements' : '/api/movements',
        }

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){

        try {
            await db.authenticate();
            // console.log('database online');
        } catch (error) {
            throw new Error( error );
        }

    }

    middlewares(){

        this.app.use( cors() );

        this.app.use( express.json() );
    }

    routes(){
        this.app.use(this.path.user,require('../routes/user'));
        this.app.use(this.path.auth,require('../routes/auth'));
        this.app.use(this.path.control,require('../routes/control'));
        this.app.use(this.path.selected,require('../routes/selected'));
        this.app.use(this.path.month,require('../routes/month'));
        this.app.use(this.path.salary,require('../routes/salary'));
        this.app.use(this.path.account_type,require('../routes/account_type'));
        this.app.use(this.path.account,require('../routes/account'));
        this.app.use(this.path.movements_user,require('../routes/movements_user'));
        this.app.use(this.path.movements,require('../routes/movements'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;