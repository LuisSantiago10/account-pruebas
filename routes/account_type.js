const { Router }  = require('express');
const { check } = require('express-validator');
const { accountTypeGet, accountTypeCreate, accountTypeUpdate, accountTypeDelete } = require('../controllers/account_type');

const { validatorfields } = require('../middlewares/validator-fields');
const { validatorJWT } = require('../middlewares/validator-token');

const router = Router();

router.get('/',[validatorJWT],accountTypeGet);
router.post('/',[
        check('description','description obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ]
,accountTypeCreate);
router.post('/update',
    [
        check('id_account_type','id_account_type obligatoy').not().isEmpty(),
        check('description','description obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ]
,accountTypeUpdate);
router.delete('/',
    [
        check('id_account_type','id_account_type obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ]
,accountTypeDelete);

module.exports = router;