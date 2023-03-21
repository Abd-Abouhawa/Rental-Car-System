const express = require('express');
const ratingController = require('./../controllers/ratingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/addRating' , /*authController.protect ,*/ratingController.addRating);
router.get('/:id' , ratingController.getRating);

module.exports = router;