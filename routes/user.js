const { Router }  = require('express');
const { check } = require('express-validator');
const { userGet,userCreate,userUpdate} = require('../controllers/user');
const { validatorfields } = require('../middlewares/validator-fields');
const { validatorJWT } = require('../middlewares/validator-token');
const router = Router();

router.get('/',[validatorJWT] ,userGet);
router.post('/',[
        check('email','The not email').isEmail(),
        check('user_name','is obligatorio').not().isEmpty(),
        check('password','the password is menor 6').isLength({ min : 6 }),
        validatorfields
    ],userCreate);
router.put('/', userUpdate);

module.exports = router;