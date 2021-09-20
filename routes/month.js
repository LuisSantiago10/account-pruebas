const { Router }  = require('express');
const { check } = require('express-validator');
const { monthGet, monthDelete } = require('../controllers/month');
const { validatorfields } = require('../middlewares/validator-fields');
const { validatorJWT } = require('../middlewares/validator-token');

const router = Router();

router.get('/',[validatorJWT],monthGet);
router.delete('/',[
    check('id_month','id_month obligatoy').not().isEmpty(),
    validatorJWT,
    validatorfields
],monthDelete);

module.exports = router;
