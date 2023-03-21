const express = require('express');
const infoController = require('./../controllers/infoController');

const router = express.Router();

router.get('/' , infoController.getInfo);
router.patch('/' , infoController.uploadAll ,infoController.updateInfo);

module.exports = router;
