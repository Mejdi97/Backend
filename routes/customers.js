const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const Customer = require('../models/Customer')
const mongoose = require('mongoose')
const auth = require('../middleware/auth');


// getting all
router.get('/', customerController.getAllCustomer);

// Getting One
router.get('/:id', auth,customerController.getOneCustomer);

// Creating one
router.post('/', customerController.createCustomer);

//UPDATE
router.patch('/:id',auth, customerController.updateCustomer);

// Deleting One
router.delete('/:id', auth, customerController.deleteCustomer);

//login 
router.post('/login',customerController.login);










module.exports = router;