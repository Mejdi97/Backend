const express = require('express')
const router = express.Router()
const Asset = require('../models/asset')
const mongoose = require('mongoose')
const assetController = require('../controllers/asset');
const multer = require ('../middleware/multer-config');
const auth = require ('../middleware/auth');

//Creating one
router.post('/',auth,multer,assetController.createAsset );

//GETTING ALL
router.get('/',assetController.getAllAssets);
  
//GETTING ONE 
router.get('/:id',assetController.getAsset);
//UPDATE
router.patch('/:id',assetController.updateAsset);
 
 //DELLITING ONE
 router.delete('/:id', auth,assetController.deleteAsset);

module.exports = router





