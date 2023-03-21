const express = require('express');
const reviewController = require('./../controllers/reviewController');

const router = express.Router();

router.post('/createReview', reviewController.createReview);
router.get('/:id', reviewController.getReview);

module.exports = router;