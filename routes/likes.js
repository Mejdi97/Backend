const express = require('express')
const router = express.Router()
const likeController = require('../controllers/like.js');
const like = require('../models/like')
const mongoose = require('mongoose')


// Getting all
router.get('/', likeController.getAllLike);
 
//GETTING ONE 
router.get('/:id', likeController.getOneLike);

// Creating one
router.post('/', likeController.createLike);

//DELLETING
router.delete('/:id', likeController.deleteLike); 
 
  module.exports = router