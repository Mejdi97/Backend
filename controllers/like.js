var mongoose = require('mongoose');
const express = require('express');
const Like = require('../models/like');
const like = require('../models/like');



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

  const like = new Like({
    ...req.body
  });
  like.save()
    .then(() => res.status(201).json(like))
    .catch(error => res.status(400).json({ error }));


};


exports.getOneLike = (req, res) => {
  Like.findOne({
    token_id: req.params.token_id
  }).then(
    (like) => {
      res.status(200).json(like);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
}




