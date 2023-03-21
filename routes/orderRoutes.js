const express = require('express');

const orderController = require('./../controllers/orderController');

const router = express.Router();

router.get('/' , orderController.getAllOrders);

router.post('/createOrder' ,
    orderController.uploadAll,
    // orderController.uploadID,
    // orderController.uploadLecience,  
    orderController.createOrder
    );
router.get('/:id' , orderController.getOrder);
router.patch('/:id' , orderController.handleOrder);

module.exports = router;
