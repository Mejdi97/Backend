const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const mongoose = require('mongoose')
const orderController = require('../controllers/order');
const auth = require('../middleware/auth');



/**
 * @swagger
 * definitions:
 *   order:
 *     properties:
 *       buyer_wallet_address:
 *         type: string
 *       seller_wallet_address:
 *         type: string
 *       seller_name:
 *         type: string
 *       buyer_name:
 *         type: string
 *       asset_name:
 *         type: string
 *       instant_sale:
 *         type: string
 */


// Getting all


/**
 * @swagger
 * /order:  
 *  get:
 *    security:
 *      - jwt: []
 *    symmaray : Get the list of orders
 *    tags : [order]
 *    responses:
 *      '200':
 *        description: A successful response..
 */


router.get('/', auth,orderController.getAllOrder);

//GETTING ONE 
router.get('/:id', auth,orderController.getOneOrder);

// Creating one

/**
 * @swagger
 * /order:
 *   post:
 *     tags:
 *       - order
 *     description: Creates a new order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: order
 *         description: order object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/order'
 *     responses:
 *       200:
 *         description: Successfully created
 */



router.post('/', orderController.createOrder);

//ipdating order



/**
 * @swagger
 * /order:
 *   put:
 *     tags:
 *       - order
 *     description: update a order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: order
 *         description: order object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/order'
 *     responses:
 *       200:
 *         description: order description by id
 *       404:
 *         description: The order was not found
 */


router.put('/:id',orderController.updateOrder);

//DELLETING

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: delete the order by id
 *     tags: [order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order description by id
 *       404:
 *         description: The order was not found
 */

router.delete('/:id', orderController.deleteOrder);
 
  module.exports = router