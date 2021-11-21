var mongoose = require('mongoose');
const express = require('express');
const Favorite = require ('../models/favorite');
const favorite = require('../models/favorite');



//get one
exports.getAllFavorite = async (req, res) => {
    try {
      const favorite = await favorite.find()
      res.json(favorite)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // Creating one
exports.createFavorite = async (req, res) => {
   
    const favorite = new Favorite ({
        asset_id: req.body.asset_id,
        
    });
     favorite.save()
     .then(() => res.status(201).json(favorite))
      .catch(error => res.status(400).json({ error }));
    

};


  exports.getOneFavorite = (req, res) => {
    favorite.findById(mongoose.Types.ObjectId(req.params.id)
   , (err, favorite) => {
     res.json(favorite);
 
     return;
   });
 }


 //delete
 exports.deleteFavorite = async (req, res) => {
    Favorite.deleteOne({_id: req.params.id}).then(
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
  
 
