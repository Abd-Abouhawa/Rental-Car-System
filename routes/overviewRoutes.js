const express = require('express');
const overview = require('./../utils/overview');

const router = express.Router();

router.get('/' , overview.getOverviewInfo);

module.exports = router;