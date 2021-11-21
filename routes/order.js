const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const mongoose = require('mongoose')
const orderController = require('../controllers/order');





// Getting all
router.get('/', orderController.getAllOrder);

//GETTING ONE 
router.get('/:id', orderController.getOneOrder);

// Creating one
router.post('/', orderController.createOrder);

//ipdating order 
router.patch('/:id',orderController.updateOrder);

//DELLETING
router.delete('/:id', orderController.deleteOrder);
 
  module.exports = router