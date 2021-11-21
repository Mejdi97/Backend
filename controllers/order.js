var mongoose = require('mongoose');
const express = require('express');
const Order = require ('../models/order');


//get one
exports.getAllOrder = async (req, res) => {
    try {
      const orders = await Order.find()
      res.json(orders)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
 
// Creating one
exports.createOrder = async (req, res) => {
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
  } 

  //Update 
  exports.updateOrder = async(req,res)=>{
    try{
  const updatedOrder = await Order.updateOne(
    {_id:req.params.id}, 
    {$set:{buyer_wallet_address: req.body.buyer_wallet_address,
        seller_wallet_address: req.body.seller_wallet_address,
        seller_name: req.body.seller_name,
        buyer_name:  req.body.buyer_name,
        asset_name: req.body.asset_name}}
  );
  res.json(updatedOrder);
    }catch (err){
      res.status(400).json({ message: err.message })
    }
  }


  //delete
   exports.deleteOrder = async (req, res) => {
    Order.deleteOne({_id: req.params.id}).then(
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

exports.getOneOrder =  (req, res) => {
    Order.findById(mongoose.Types.ObjectId(req.params.id)
   , (err, order) => {
     console.log(order);
     res.json(order);
     return;
   });
 }


