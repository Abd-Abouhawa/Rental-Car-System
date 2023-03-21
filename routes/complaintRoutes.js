const express = require('express');
const complaintController = require('./../controllers/complaintController');

const router = express.Router();

router.get('/' , complaintController.getAllComplaints);
router.post('/' , complaintController.addComplaint);

module.exports = router;