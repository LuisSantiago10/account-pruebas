const { Router }  = require('express');
const { check } = require('express-validator');
const { movementsGet, movementsCreate, movementsDelete } = require('../controllers/movements');

const { validatorfields } = require('../middlewares/validator-fields');
const { validatorJWT } = require('../middlewares/validator-token');

const router = Router();

router.get('/',[validatorJWT],movementsGet);
router.post('/',[
        check('type','type obligatoy').not().isEmpty(),
        check('id_month','id_mounth obligatoy').not().isEmpty(),
        check('id_account','id_account obligatoy').not().isEmpty(),
        check('description','description obligatoy').not().isEmpty(),
        check('amount','amount obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ],movementsCreate);

router.delete('/',
    [
        check('id_movements','id_movements obligatoy').not().isEmpty(),
        check('type','type obligatoy').not().isEmpty(),
        check('id_account','id_account obligatoy').not().isEmpty(),
        check('amount','amount obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ]
,movementsDelete);

module.exports = router;