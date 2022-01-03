const express = require('express')
const router = express.Router()
const favoriteController = require('../controllers/favorite.js');
const favorite = require('../models/favorite')
const mongoose = require('mongoose')






/**
 * @swagger
 * definitions:
 *   favorites:
 *     properties:
 *       asset_id:
 *         type: array
 * 
 */

// Getting all

/**
 * @swagger
 * /favorite:
 *  get:
 *    symmaray : Get the list of favorites
 *    tags : [favorites]
 *    responses:
 *      '200':
 *        description: A successful response..
 */
router.get('/', favoriteController.getAllFavorite);
 
//GETTING ONE 
/**
 * @swagger
 * /favorite/{id}:
 *   get:
 *     summary: Get the my favorites by id
 *     tags: [favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The favorites by id
 *     responses:
 *       200:
 *         description: The favorites description by id
 *       404:
 *         description: The favorites was not found
 */

router.get('/:id', favoriteController.getOneFavorite);

//getting favorite by customerid

//router.get('/id',favoriteController.getByCustomer);



// Creating one
/**
 * @swagger
 * /favorites:
 *   post:
 *     tags:
 *       - favorites
 *     description: add a favorite 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: favorites
 *         description: favorites object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/favorites'
 *     responses:
 *       200:
 *         description: Successfully added
 */

router.post('/', favoriteController.createFavorite);





//DELLETING


/**
 * @swagger
 * /favorite/{id}:
 *   delete:
 *     summary: delete the favorites by id
 *     tags: [favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The favorites id
 *     responses:
 *       200:
 *         description: The favorites description by id
 *       404:
 *         description: The favorites was not found
 */


router.delete('/:id', favoriteController.deleteFavorite); 
 
  module.exports = router


