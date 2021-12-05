const express = require('express')
const router = express.Router()
const favoriteController = require('../controllers/favorite.js');
const favorite = require('../models/favorite')
const mongoose = require('mongoose')


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

// Creating one

/**
 * @swagger
 * /favorite:
 *   post:
 *     tags: [favorites]
 *     parameters:
 *       - in: path
 *         name: asset_id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: add asset to my favorites
 *       404:
 *         description: error
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


