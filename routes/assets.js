const express = require('express')
const router = express.Router()
const Asset = require('../models/asset')
const mongoose = require('mongoose')


//Creating one
router.post('/', async (req, res) => {
    const asset = new Asset({
        owner: req.body.wallet_address,
        name_asset: req.body.name_asset,
      description:req.body.description,
      bids:req.body.bids,
      instant_sale:req.body.instant_sale,
      price:req.body.price
    })
    try {
      const newAsset = await asset.save();
      res.status(201).json(newAsset)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

//GETTING ALL

router.get('/', async (req, res) => {
    try {
      const assets = await Asset.find()
      res.json(assets)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
//GETTING ONE 
router.get('/:id', (req, res) => {
    Asset.findById(mongoose.Types.ObjectId(req.params.id)
   , (err, asset) => {
     console.log(asset);
     res.json(asset);
     return;
   });
 });

 
 
 //DELLITING ONE
 
 router.delete('/:id', getAsset ,async (req, res) => {
    try {
      await res.Asset.deleteOne()
      res.json({ message: 'Deleted asset' })
    } catch (err) {
      res.status(500).json({ message: err.message})
    }
  })


 //GET ASSET BY ID 
async function getAsset(req, res, next) {
  let assett
  try {
    assett = await Asset.findById(mongoose.Types.ObjectId(req.params.id))
    if (assett == null) {
      return res.status(404).json({ message: 'Cannot find this asset' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.Asset = Asset
  next()
}

//UPDATE
router.patch('/:id',async(req,res)=>{
    try{
  const updatedAsset = await Asset.updateOne(
    {_id:req.params.id}, 
    {$set:{owner:req.body.owner,
    name_asset:req.body.name_asset,
  description:req.body.description,
    bids:req.body.bids,
    instant_sale:req.body.instant_sale,
    price:req.body.price}}
  );
  res.json(updatedAsset);
    }catch (err){
      res.status(400).json({ message: err.message })
    }
  });



////
module.exports = router