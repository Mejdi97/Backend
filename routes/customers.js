const express = require('express')
const router = express.Router()
const Customer = require('../models/Customer')
const mongoose = require('mongoose')




// Getting all
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find()
    res.json(customers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getCustomer(req, res, next) {
  let customerr
  try {
    customerr = await Customer.findById(mongoose.Types.ObjectId(req.params.id))
    if (customerr == null) {
      return res.status(404).json({ message: 'Cannot find Customer' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.Customer = Customer
  next()
}

// Getting One
router.get('/:id', (req, res) => {
   Customer.findById(mongoose.Types.ObjectId(req.params.id)
  , (err, customer) => {
    console.log(customer);

    return;
  });
});


// Creating one
router.post('/', async (req, res) => {
  const customer = new Customer({
    wallet_address: req.body.wallet_address,
    name: req.body.name
  })
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
/*// Updating One
router.patch('/:id', getCustomer, async (req, res) => {
  if (req.body.wallet_address != null) {
    res.Customer.wallet_address = req.body.wallet_address
  }
  if (req.body.name != null) {
    res.Customer.name = req.body.name
  }
  try {
    //nahki l majuscule  leee khaleha edhiak hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh chouf trah behi
    const updatedCustomer = await customer.save(function(){})
    res.status(201).json(updatedCustomer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})*/


//UPDATE2
router.patch('/:id',async(req,res)=>{
  try{
const updatedCustomer = await Customer.updateOne(
  {_id:req.params.id}, 
  { $set: {wallet_address:req.body.wallet_address,
 name:req.body.name}}
);
res.json(updatedCustomer);
  }catch (err){
    res.status(400).json({ message: err.message })
  }
});






// Deleting One

router.delete('/:id', getCustomer ,async (req, res) => {
  try {
    await res.Customer.deleteOne()
    res.json({ message: 'Deleted Customer' })
  } catch (err) {
    res.status(500).json({ message: err.message})
  }
})






module.exports = router