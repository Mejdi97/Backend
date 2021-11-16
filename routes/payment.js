const express = require('express')
const router = express.Router()
const payment = require('./payment')
const mongoose = require('mongoose')




// Creating one
router.post('/', async (req, res) => {
    const payment = new payment({
        wallet_address: req.body.wallet_address,
        payment_history: req.body.payment_history,
        total: req.body.total,
    })
    try {
      const newPayment = await payment.save();
      res.status(201).json(newPayment)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })









module.exports = router
