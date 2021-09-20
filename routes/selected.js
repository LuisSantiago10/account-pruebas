const { controlselectGet, controlselectCreate, controlselectUpdate, controlselectDelete } = require('../controllers/control-select');
const { validatorJWT } = require('../middlewares/validator-token');
const { validatorfields } = require('../middlewares/validator-fields');
const { Router }  = require('express');
const { check } = require('express-validator');

const router = Router();

router.get('/',[validatorJWT],controlselectGet);
router.post('/',[
    check('id_control','id_control obligatoy').not().isEmpty(),
    validatorJWT,
    validatorfields
], controlselectCreate);
router.post('/update',[
    check('id_control','id_control obligatoy').not().isEmpty(),
    check('id_control_select','id_control obligatoy').not().isEmpty(),
    validatorJWT,
    validatorfields
], controlselectUpdate);
router.delete('/',[
    check('id_control_select','id_control obligatoy').not().isEmpty(),
    validatorJWT,
    validatorfields
], controlselectDelete);

module.exports = router;