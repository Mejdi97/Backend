const express = require('express')
const router = express.Router()
const Asset = require('../models/asset')
const mongoose = require('mongoose')
const assetController = require('../controllers/asset');


//Creating one
router.post('/',assetController.createAsset );

//GETTING ALL
router.get('/',assetController.getAllAssets);
  
//GETTING ONE 
router.get('/:id',assetController.getAsset);
//UPDATE
router.patch('/:id',assetController.updateAsset);
 
 //DELLITING ONE
 router.delete('/:id', assetController.deleteAsset);

module.exports = router