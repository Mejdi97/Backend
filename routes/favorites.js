const express = require('express')
const router = express.Router()
const favoriteController = require('../controllers/favorite.js');
const favorite = require('../models/favorite')
const mongoose = require('mongoose')


// Getting all
router.get('/', favoriteController.getAllFavorite);
 
//GETTING ONE 
router.get('/:id', favoriteController.getOneFavorite);

// Creating one
router.post('/', favoriteController.createFavorite);

//DELLETING
router.delete('/:id', favoriteController.deleteFavorite); 
 
  module.exports = router