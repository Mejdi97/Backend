var mongoose = require('mongoose');
const express = require('express');
const Bids = require('../models/order');


//get one
exports.getAllBids = async (req, res) => {
  try {
    const bids = await Order.find()
    res.json(bids)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Creating one
exports.createBids = async (req, res) => {
  const bids = new Bids({
    asset_id: req.body.asset_id,
    entrance_date: req.body.entrance_date,
    closure_date: req.body.closure_date,
    entrance_price: req.body.entrance_price,
    last_price: req.body.last_price
  });
  bids.save()
    .then(() => res.status(201).json(bids))
    .catch(error => res.status(400).json({ error }));


};


//Update 
exports.updateBids = async (req, res) => {
  try {
    const updatedBids = await Order.updateOne(
      { _id: req.params.id },
      {
        $set: {
          asset_id: req.body.asset_id,
          entrance_date: req.body.entrance_date,
          closure_date: req.body.closure_date,
          entrance_price: req.body.entrance_price,
          last_price: req.body.last_price
        }
      }
    );
    res.json(updatedBids);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}


//delete
exports.deleteBids = async (req, res) => {
  Bids.deleteOne({ _id: req.params.id }).then(
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

exports.getOneBids = (req, res) => {
  Bids.findById(mongoose.Types.ObjectId(req.params.id)
    , (err, bids) => {
      console.log(bids);
      res.json(bids);
      return;
    });
}


