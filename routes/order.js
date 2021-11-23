const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const mongoose = require('mongoose')
const orderController = require('../controllers/order');
const auth = require('../middleware/auth');





// Getting all
router.get('/', auth,orderController.getAllOrder);

//GETTING ONE 
router.get('/:id', auth,orderController.getOneOrder);

// Creating one
router.post('/',auth, orderController.createOrder);

//ipdating order 
router.patch('/:id',auth,orderController.updateOrder);

//DELLETING
router.delete('/:id', orderController.deleteOrder);
 
  module.exports = router