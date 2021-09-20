const { Router }  = require('express');
const { check } = require('express-validator');
const { controlGet,controlCreate,controlUpdate, controlDelete } = require('../controllers/control');
const { validatorfields } = require('../middlewares/validator-fields');
const { validatorJWT } = require('../middlewares/validator-token');

const router = Router();

router.get('/',[validatorJWT],controlGet);
router.post('/',[
        check('description','description obligatoy').not().isEmpty(),
        check('basic','basic obligatoy').not().isEmpty(),
        check('variable','variable obligatoy').not().isEmpty(),
        check('saving','saving obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ],controlCreate);
router.post('/update',
    [
        check('id_control','id_control obligatoy').not().isEmpty(),
        check('description','description obligatoy').not().isEmpty(),
        check('basic','basic obligatoy').not().isEmpty(),
        check('variable','variable obligatoy').not().isEmpty(),
        check('saving','saving obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ]
,controlUpdate);
router.delete('/',
    [
        check('id_control','id_control obligatoy').not().isEmpty(),
        check('validate','description obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ]
,controlDelete);

module.exports = router;
