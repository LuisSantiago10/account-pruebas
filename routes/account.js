const { Router }  = require('express');
const { check } = require('express-validator');
const { accountGet, accountCreate, accountUpdate, accountDelete } = require('../controllers/account');

const { validatorfields } = require('../middlewares/validator-fields');
const { validatorJWT } = require('../middlewares/validator-token');

const router = Router();

router.get('/',[validatorJWT],accountGet);
router.post('/',[
        check('description','description obligatoy').not().isEmpty(),
        check('concept','concept obligatoy').not().isEmpty(),
        check('amount','amount obligatoy').not().isEmpty(),
        check('id_account_type','id_account_type obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ]
,accountCreate);
router.post('/update',
    [
        check('id_account_type','id_account_type obligatoy').not().isEmpty(),
        check('description','description obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ]
,accountUpdate);
router.delete('/',
    [
        check('id_account_type','id_account_type obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ]
,accountDelete);

module.exports = router;