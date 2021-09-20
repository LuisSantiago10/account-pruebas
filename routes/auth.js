const { Router }  = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');

const { validatorfields } = require('../middlewares/validator-fields');
const router = Router();

router.post('/login',[
    check('email','The not email').isEmail(),
    check('password','password obligatoy').not().isEmpty(),
    validatorfields
],login);
module.exports = router;