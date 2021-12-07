const express = require('express')
const router = express.Router()
const Bids = require('../models/order')
const mongoose = require('mongoose')
const bidsController = require('../controllers/bids');



/**
 * @swagger
 * definitions:
 *   bids:
 *     properties:
 *       asset_id:
 *         type: array
 *       entrance_date:
 *         type: date
 *       closure_date:
 *         type: date
 *       entrance_price:
 *         type: number
 *       last_price:
 *         type: number
 */



// Getting all

/**
 * @swagger
 * /bids:
 *  get:
 *    symmaray : Get the list of bids
 *    tags : [bids]
 *    responses:
 *      '200':
 *        description: A successful response..
 */


router.get('/', bidsController.getAllBids);

//GETTING ONE 

/**
 * @swagger
 * /bids/{id}:
 *   get:
 *     summary: Get the bids by id
 *     tags: [bids]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bids id
 *     responses:
 *       200:
 *         description: The bids description by id
 *       404:
 *         description: The bids was not found
 */


router.get('/:id', bidsController.getOneBids);

// Creating one

/**
 * @swagger
 * /bids:
 *   post:
 *     tags:
 *       - bids
 *     description: Creates a new bids
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bids
 *         description: bids object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/bids'
 *     responses:
 *       200:
 *         description: Successfully created
 */


router.post('/', bidsController.createBids);

//updating order 
router.patch('/:id',bidsController.updateBids);

//DELLETING



/**
 * @swagger
 * /bids/{id}:
 *   delete:
 *     summary: delete the bids by id
 *     tags: [bids]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bids id
 *     responses:
 *       200:
 *         description: The bids description by id
 *       404:
 *         description: The bids was not found
 */


router.delete('/:id', bidsController.deleteBids);
 
  module.exports = router