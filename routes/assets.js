const express = require('express')
const router = express.Router()
const Asset = require('../models/asset')
const mongoose = require('mongoose')
const assetController = require('../controllers/asset');
const multer = require ('../middleware/multer-config');
const auth = require ('../middleware/auth');




/**
 * @swagger
 * definitions:
 *   assets:
 *     properties:
 *       owner:
 *         type: object
 *       asset_picture:
 *         type: string
 *       name_asset:
 *         type: string
 *       description:
 *         type: string
 *       bids:
 *         type: boolean
 *       instant_sale:
 *         type: boolean
 *       price:
 *         type: number
 * 
 */


//Creating one

/**
 * @swagger
 * /assets:
 *   post:
 *     tags:
 *       - assets
 *     description: Creates a new asset
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: asset
 *         description: assets object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/assets'
 *     responses:
 *       200:
 *         description: Successfully created
 */


router.post('/',multer.single('asset_picture'),assetController.createAsset );

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
 * /assets:
 *   put:
 *     tags:
 *       - assets
 *     description: update a single asset
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: assets
 *         description: assets object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/assets'
 *     responses:
 *       200:
 *         description: The assets description by id
 *       404:
 *         description: The assets was not found
 */
router.patch('/:id',auth,assetController.updateAsset);
 
 //DELLITING ONE
/**
 * @swagger
 * /assets/{id}:
 *   delete:
 *     summary: delete the asset by id
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





