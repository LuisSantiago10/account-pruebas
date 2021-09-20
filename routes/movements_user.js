const { Router }  = require('express');
const { check } = require('express-validator');
const { movementsUserGet, movementsUserCreate, movenmentsUserUpdate, movementsUserDelete } = require('../controllers/movements_user');

const { validatorfields } = require('../middlewares/validator-fields');
const { validatorJWT } = require('../middlewares/validator-token');

const router = Router();

router.get('/',[validatorJWT],movementsUserGet);
router.post('/',[
        check('id_account','id_account obligatoy').not().isEmpty(),
        check('description','description obligatoy').not().isEmpty(),
        check('amount','amount obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ],movementsUserCreate);
router.post('/update',
    [
        check('id_movement_user','id_movement_user obligatoy').not().isEmpty(),
        check('id_account','id_account obligatoy').not().isEmpty(),
        check('description','description obligatoy').not().isEmpty(),
        check('amount','amount obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ]
,movenmentsUserUpdate);
router.delete('/',
    [
        check('id_movement_user','id_movement_user obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ]
,movementsUserDelete);

module.exports = router;