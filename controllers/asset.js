var mongoose = require('mongoose');
const express = require('express');
const Asset = require('../models/asset');
const fs = require('fs');
const asset = require('../models/asset');





//liste All assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find()
    res.json(assets)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


//creating one
exports.createAsset = async (req, res) => {
  const asset = new Asset({
    owner: req.body.wallet_address,
    name_asset: req.body.name_asset,
    description: req.body.description,
    bids: req.body.bids,
    instant_sale: req.body.instant_sale,
    price: req.body.price,
    //asset_picture: req.file.path

  });
  asset.save()
    .then(() => res.status(201).json(asset))
    .catch(error => res.status(400).json({ error }));


};





//GETTING ONE 
exports.getAsset = (req, res) => {
  Asset.findById(mongoose.Types.ObjectId(req.params.id)
    , (err, asset) => {
      console.log(asset);
      res.json(asset);
      return;
    });
}


//update Assets
exports.updateAsset = async (req, res) => {
  try {
    const updatedAsset = await Asset.updateOne(
      { _id: req.params.id },
      {
        $set: {
          owner: req.body.owner,
          name_asset: req.body.name_asset,
          description: req.body.description,
          bids: req.body.bids,
          instant_sale: req.body.instant_sale,
          price: req.body.price
        }
      }
    );
    res.json(updatedAsset);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}


//delete Asset
/* exports.deleteAsset = async (req, res) => {
  const filename = asset.asset.picture;   
    Asset.deleteOne({ _id: req.params.id }).then(
    () => {
      fs.unlink(`images/${filename}`),  
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error });
    }
  );
} */


exports.deleteAsset = (req, res, next) => {
  Asset.findOne({ _id: req.params.id })
    .then(asset => {
      const filename = asset.asset_picture;
      fs.unlink(`${filename}`, () => {
        Asset.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));


};

