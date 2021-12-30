const express = require('express')
const router = express.Router()
const likeController = require('../controllers/like.js');
const like = require('../models/like')
const mongoose = require('mongoose')


// Getting all
router.get('/', likeController.getAllLike);
 
//GETTING ONE 
router.get('/:token_id', likeController.getOneLike);

// Creating one
router.post('/', likeController.createLike);

//UPDATING
router.put('/:token_id', async (req, res, next) => {

  await like.findOneAndUpdate(
    { token_id: req.params.token_id },
    { $push: { likers: req.body._id } },
    { new: true }
  ).exec()
  res.status(200).json({ message: 'ok'})
  /* like.updateOne({ token_id: req.params.token_id },
    
    { $push: { likers: req.body.token_id} },
    { new: true }).exec()
    .then(() => res.status(200).json({ message: 'ok'}))
    .catch(error => res.status(400).json({ error })); */
}); 
  module.exports = router