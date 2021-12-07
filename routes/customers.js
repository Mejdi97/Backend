const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const Customer = require('../models/Customer')
const mongoose = require('mongoose')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");



/**
 * @swagger
 * definitions:
 *   customers:
 *     properties:
 *       wallet_address:
 *         type: string
 *       name:
 *         type: string
 *       url:
 *         type: string
 *       bio:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       social_media_accounts:
 *         type: array
 * 
 */




// getting all

/**
 * @swagger
 * /customers:
 *  get:
 *    symmaray : Get the list of cutomers
 *    tags : [customers]
 *    responses:
 *      '200':
 *        description: A successful response..
 */
router.get('/', customerController.getAllCustomer);

// Getting One

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get the customer by id
 *     tags: [customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer id
 *     responses:
 *       200:
 *         description: The customer description by id
 *       404:
 *         description: The customer was not found
 */

router.get('/:id', customerController.getOneCustomer);

/**
 * @swagger
 * /customers:
 *   post:
 *     tags:
 *       - customers
 *     description: Creates a new customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customer
 *         description: customer object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/customers'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.post('/', customerController.createCustomer);

//UPDATE
/**
 * @swagger
 * /customers:
 *   put:
 *     tags:
 *       - customers
 *     description: update a customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customer
 *         description: customer object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/customers'
 *       - in: formData
 *         name: profile_picture
 *         type: file
 *         required: false
 *       - in: formData
 *         name: couverture_picture
 *         type: file
 *     responses:
 *       200:
 *         description: The customer description by id
 *       404:
 *         description: The customer was not found
 */

router.put('/:id', multer.fields([{ name: 'profile_picture', maxCount: 1 }, { name: 'couverture_picture', maxCount: 1 }]), customerController.updateCustomer);


// Deleting One

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: delete the customer by id
 *     tags: [customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer id
 *     responses:
 *       200:
 *         description: The customer description by id
 *       404:
 *         description: The customer was not found
 */

router.delete('/:id', customerController.deleteCustomer);

//login 

/**
 * @swagger
 * /customers/login:
 *   post:
 *     summary: use this route to login 
 *     tags: [Login]  
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: successfully login
 *       404:
 *         description: error
 */

router.post('/login', customerController.login);

//forgot password 

/**
 * @swagger
 * /customers/recover:
 *   post:
 *     summary: use this route to have access to change password 
 *     tags: [Forget Password]  
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: successfully sent !
 *       404:
 *         description: error
 */
router.post('/recover', customerController.recover);




router.get('/reset/:token', customerController.reset);
// change the password 
/**
 * @swagger
 * /customers/reset/{token}:
 *   post:
 *     summary: use this route to reset your password 
 *     tags: [Forget Password]  
 *     parameters:
 *       - in: path
 *         password: password
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: password updated !
 *       404:
 *         description: error
 */
router.post('/reset/:token', customerController.resetPassword);

/*
router.post('/forgot-password', customerController.forgotPassword);

//reset password
router.put('/password-reset/:id',auth,customerController.resetPassword);
*/
module.exports = router;