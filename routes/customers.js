const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const Customer = require('../models/Customer')
const mongoose = require('mongoose')
const auth = require ('../middleware/auth');


// Getting all
router.get('/',customerController.getAllCustomer );

// Getting One
router.get('/:id',customerController.getOneCustomer);

// Creating one
router.post('/',auth,customerController.createCustomer );

//UPDATE
router.patch('/:id',auth,customerController.updateCustomer);

// Deleting One
router.delete('/:id', auth,customerController.deleteCustomer);

//login 
router.post('/login',auth,customerController.login);





module.exports = router;