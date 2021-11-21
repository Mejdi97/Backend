const express = require('express')
const router = express.Router()
const Payment = require('./payment')
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




// Getting all
router.get('/', async (req, res) => {
    try {
      const payments = await Payment.find()
      res.json(payments)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })





module.exports = router
