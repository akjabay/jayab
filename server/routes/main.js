const express = require('express');
const router = express.Router();
const authjwt = require('../middlewares/authjwt');
const authjwtRest = require('../middlewares/authjwtRest');

const { check } = require('express-validator');

const mainControllers = require('../controllers/main');


router.post('/upload', authjwtRest, mainControllers.postUpload);

router.post('/upload/delete-file', authjwtRest, [
    check('filename').isString().isLength({ max: 1000 }).escape().trim(),
], mainControllers.postUploadDeleteFile);

router.post('/upload/downlaod-file', authjwtRest, [
    check('filename').isString().isLength({ max: 1000 }).escape().trim(),
], mainControllers.postDownloadFile);

router.get('/provinces', mainControllers.getProvinces);
router.get('/cities', [
    check('province_id').isNumeric().isLength({ max: 3 }).escape().trim(),
], mainControllers.getCities);
router.get('/plans', authjwtRest, mainControllers.getPlans);

module.exports = router;
