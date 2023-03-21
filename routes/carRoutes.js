const express = require('express');
const router = express.Router();

const carController = require('./../controllers/carController');

// localhost:5000/cars/addCar
// www.facebook.com/?category=sport&sort=-price&brand=merceds

router.get('/', carController.getAllCars);
router.get('/getCar/:id', carController.getCar);
router.post('/addCar', carController.uploadAll, carController.addCar);
router.patch('/updateCar/:id',carController.uploadAll, carController.updateCar);
router.delete('/deleteCar/:id', carController.deleteCarAndRecovery);


module.exports = router;