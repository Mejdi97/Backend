const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const Customer = require('../models/Customer')
const mongoose = require('mongoose')
const auth = require('../middleware/auth');

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
<<<<<<< HEAD
router.get('/:id', auth,customerController.getOneCustomer);
=======

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
router.get('/:id',customerController.getOneCustomer);
>>>>>>> d3d76ebe94020c50799527533aad6f983172f636

// Creating one


/**
 * @swagger
 * /customers:
 *   post:
 *     tags: [customers]
 *     responses:
 *       200:
 *         description: The customer created
 *       404:
 *         description: error
 */

router.post('/', customerController.createCustomer);





//UPDATE
<<<<<<< HEAD
router.patch('/:id',auth, customerController.updateCustomer);
=======
/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: update the customer by id
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
router.put('/:id', auth,customerController.updateCustomer);
>>>>>>> d3d76ebe94020c50799527533aad6f983172f636

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
router.post('/login',customerController.login);










module.exports = router;