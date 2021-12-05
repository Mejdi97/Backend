const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const Customer = require('../models/Customer')
const mongoose = require('mongoose')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


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

// Creating one


/**
 * @swagger
 * /customers:
 *   post:
 *     tags: [customers]
 *     parameters:
 *       - in: path
 *         name: wallet_address
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: url
 *         schema:
 *           type: string
 *         required: false
 *       - in: path
 *         name: bio
 *         schema:
 *           type: string
 *         required: false
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: false
 *       - in: path
 *         name: password
 *         schema:
 *           type: string
 *         required: false
 *       - in: path
 *         name: social_media_accounts
 *         schema:
 *           type: string
 *         required: false
 *       - in: formData
 *         name: profile_picture
 *         schema:
 *           type: file
 *         required: false
 *     responses:
 *       200:
 *         description: The customer created
 *       404:
 *         description: error
 */

router.post('/', customerController.createCustomer);

//UPDATE
/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: update the customer by id
 *     tags: [customers]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer id
 *       - in: path
 *         name: wallet_address
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: url
 *         schema:
 *           type: string
 *         required: false
 *       - in: path
 *         name: bio
 *         schema:
 *           type: string
 *         required: false
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: false
 *       - in: path
 *         name: password
 *         schema:
 *           type: string
 *         required: false
 *       - in: path
 *         name: social_media_accounts
 *         schema:
 *           type: string
 *         required: false
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

router.put('/:id',multer.fields([{name:'profile_picture', maxCount: 1}, {name: 'couverture_picture',maxCount: 1}]), customerController.updateCustomer);


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

router.delete('/:id', auth, customerController.deleteCustomer);

//login 

/**
 * @swagger
 * /customers/login:
 *   post:
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
 *         description: The customer created
 *       404:
 *         description: error
 */

router.post('/login', customerController.login);

//forgot password 

/**
 * @swagger
 * /customers/forgot-password:
 *   post:
 *     tags: [Forget Password]  
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The customer created
 *       404:
 *         description: error
 */


router.post('/forgot-password', customerController.forgotPassword);

//reset password
//router.patch('/password-reset/:id',customerController.resetPassword);


module.exports = router;