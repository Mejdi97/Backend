const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const Customer = require('../models/Customer')
const mongoose = require('mongoose')
const auth = require('../middleware/auth');


// getting all
router.get('/', customerController.getAllCustomer);

// Getting One
router.get('/:id',customerController.getOneCustomer);

// Creating one
router.post('/', customerController.createCustomer);

//UPDATE
router.put('/:id', auth,customerController.updateCustomer);

// Deleting One
router.delete('/:id', auth, customerController.deleteCustomer);

//login 
router.post('/login',customerController.login);

//forgot password 
//router.post('/forgot-password',customerController.forgotPassword);

//reset password
//router.patch('/password-reset/:id',customerController.resetPassword);



module.exports = router;