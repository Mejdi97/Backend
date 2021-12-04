const express = require('express')
const router = express.Router()
const Asset = require('../models/asset')
const mongoose = require('mongoose')
const assetController = require('../controllers/asset');
const multer = require ('../middleware/multer-config');
const auth = require ('../middleware/auth');

//Creating one
router.post('/',multer,assetController.createAsset );

//GETTING ALL

/**
 * @swagger
 * /assets:
 *  get:
 *    symmaray : Get the list of assets
 *    tags : [assets]
 *    responses:
 *      '200':
 *        description: A successful response..
 */

router.get('/',assetController.getAllAssets);
  
//GETTING ONE 

/**
 * @swagger
 * /assets/{id}:
 *   get:
 *     summary: Get the asset by id
 *     tags: [assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The asset id
 *     responses:
 *       200:
 *         description: The asset description by id
 *       404:
 *         description: The asset was not found
 */
router.get('/:id',assetController.getAsset);

//UPDATE

/**
 * @swagger
 * /assets/{id}:
 *   put:
 *     summary: update the asset by id
 *     tags: [assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The asset id
 *     responses:
 *       200:
 *         description: The asset description by id
 *       404:
 *         description: The asset was not found
 */
router.patch('/:id',auth,assetController.updateAsset);
 
 //DELLITING ONE
/**
 * @swagger
 * /assets/{id}:
 *   delete:
 *     summary: delete the customer by id
 *     tags: [assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assets id
 *     responses:
 *       200:
 *         description: The assets description by id
 *       404:
 *         description: The assets was not found
 */

 router.delete('/:id',assetController.deleteAsset);

module.exports = router





