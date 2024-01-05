const express = require('express');
const router = express.Router();

const { batTu, tuVi } = require('../controllers/image.controller');

router.route('/bat-tu').post(batTu);
router.route('/tu-vi').post(tuVi);

module.exports = router;
