var mongoose = require('mongoose');
const express = require('express');
const Favorite = require('../models/favorite');



//get all
exports.getAllFavorite = async (req, res) => {
  
  try {
    const favorites = await Favorite.find()
    res.json(favorites)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Creating one
exports.createFavorite = (req, res) => {

  
  const favorite = new Favorite({
    asset_id: req.body.asset_id,
    
  });
  favorite.save().then(
    () => {
      res.status(201).json({
        message: 'saved!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}




//get one
exports.getOneFavorite = (req, res) => {
  Favorite.findOne({
    _id: req.params.id
  }).then(
    (favorite) => {
      res.status(200).json(favorite);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
}


//delete
exports.deleteFavorite = async (req, res) => {
  Favorite.deleteOne({ _id: req.params.id }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error });
    }
  );
}


