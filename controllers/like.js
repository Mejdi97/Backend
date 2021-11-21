var mongoose = require('mongoose');
const express = require('express');
const Like = require ('../models/like');



//get one
exports.getAllLike = async (req, res) => {
    try {
      const like = await Like.find()
      res.json(like)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // Creating one
exports.createLike = async (req, res) => {
   
    const like = new Like ({
        asset_name: req.body.asset_name,
        number_of_likes: req.body.number_of_likes
        

        
    });
     like.save()
     .then(() => res.status(201).json(like))
      .catch(error => res.status(400).json({ error }));
    

};


  exports.getOneLike = (req, res) => {
    Like.findById(mongoose.Types.ObjectId(req.params.id)
   , (err, like) => {
     res.json(like);
 
     return;
   });
 }


 //delete
 exports.deleteLike = async (req, res) => {
    Like.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {res.status(400).json({error: error});
      }
    );
  }
  
 
