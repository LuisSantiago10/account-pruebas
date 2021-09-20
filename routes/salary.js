const { Router }  = require('express');
const { check } = require('express-validator');
const { salaryGet, salaryCreate, salaryUpdate, salaryDelete } = require('../controllers/salary');

const { validatorfields } = require('../middlewares/validator-fields');
const { validatorJWT } = require('../middlewares/validator-token');

const router = Router();

router.get('/',[validatorJWT],salaryGet);
router.post('/',[
        check('mount','description obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ],salaryCreate);
router.post('/update',
    [
        check('id_salary','id_control obligatoy').not().isEmpty(),
        check('mount','id_control obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ]
,salaryUpdate);
router.delete('/',
    [
        check('id_salary','id_control obligatoy').not().isEmpty(),
        validatorJWT,
        validatorfields
    ]
,salaryDelete);

module.exports = router;