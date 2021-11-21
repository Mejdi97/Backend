const express = require('express')
const router = express.Router()
const Bids = require('../models/order')
const mongoose = require('mongoose')
const bidsController = require('../controllers/bids');





// Getting all
router.get('/', bidsController.getAllBids);

//GETTING ONE 
router.get('/:id', bidsController.getOneBids);

// Creating one
router.post('/', bidsController.createBids);

//ipdating order 
router.patch('/:id',bidsController.updateBids);

//DELLETING
router.delete('/:id', bidsController.deleteBids);
 
  module.exports = router