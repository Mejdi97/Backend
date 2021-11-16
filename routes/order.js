const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const mongoose = require('mongoose')




// Getting all
router.get('/', async (req, res) => {
    try {
      const orders = await Order.find()
      res.json(orders)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

//GETTING ONE 
router.get('/:id', (req, res) => {
    Order.findById(mongoose.Types.ObjectId(req.params.id)
   , (err, order) => {
     console.log(order);
     res.json(order);
     return;
   });
 });

// Creating one
router.post('/', async (req, res) => {
    const order = new Order({
        buyer_wallet_address: req.body.buyer_wallet_address,
        seller_wallet_address: req.body.seller_wallet_address,
        seller_name: req.body.seller_name,
        buyer_name:  req.body.buyer_name,
        asset_name: req.body.asset_name
    })
    try {
      const newOrder = await order.save();
      res.status(201).json(newOrder)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })


 //GET ASSET BY ID 
 async function getOrder(req, res, next) {
    let assett
    try {
      orderr = await Order.findById(mongoose.Types.ObjectId(req.params.id))
      if (orderr == null) {
        return res.status(404).json({ message: 'Cannot find this ORDER' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }

    next()
  }


//DELLETING
router.delete('/:id', getOrder ,async (req, res) => {
    try {
      await res.Asset.deleteOne()
      res.json({ message: 'Order Deleted' })
    } catch (err) {
      res.status(500).json({ message: err.message})
    }
  })


  module.exports = router