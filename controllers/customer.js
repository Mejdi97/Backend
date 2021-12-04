const Customer = require ('../models/Customer');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
<<<<<<< HEAD
const jwt = require ('jsonwebtoken');
=======
const jwt = require('jsonwebtoken');
const sendEmail = require('../middleware/send-mail');
>>>>>>> d3d76ebe94020c50799527533aad6f983172f636



  //getting all 
exports.getAllCustomer = async (req, res) => {
    try {
      const customers = await Customer.find()
      res.json(customers)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }


//getting One
exports.getOneCustomer = (req, res) => {
    Customer.findById(mongoose.Types.ObjectId(req.params.id)
   , (err, customer) => {
     res.json(customer);
 
     return;
   });
 }



//create custumorr
exports.createCustomer = async (req, res) => {

    console.log(req.file)
    try {
      
      const hashedPAssword = await bcrypt.hash(req.body.password, 10)  
      const customer = new Customer({
      wallet_address: req.body.wallet_address,
      name: req.body.name,
      url: req.body.url,
      bio: req.body.bio,
      email:req.body.email,
      password:hashedPAssword,
      social_media_accounts:req.body.social_media_accounts
      
  
    })    
      const newCustomer = await customer.save();
      res.status(201).json(newCustomer)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }




  //update customer
  exports.updateCustomer = async(req,res)=>{
    try{
  const updatedCustomer = await Customer.updateOne(
    {_id:req.params.id}, 
    { $set: {
      wallet_address: req.body.wallet_address,
      name: req.body.name,
      url: req.body.url,
      bio: req.body.bio,
      email:req.body.email,
      password:hashedPAssword,
      social_media_accounts:req.body.social_media_accounts
  }}
  );
  res.json(updatedCustomer);
    }catch (err){
      res.status(400).json({ message: err.message })
    }
  }

  //delete customer
  exports.deleteCustomer = async (req, res) => {
        Customer.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
<<<<<<< HEAD
        ).catch(
          (error) => {res.status(400).json({error: error});
          }
        );
      }



//login

  exports.login = (req, res, next) => {
    Customer.findOne({ email: req.body.email }) 
  .then(Customer => {
    if (!Customer) {
      return res.status(401).json({ error: 'Customer not found  !' });
    }
    bcrypt.compare(req.body.password, Customer.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'password incorrect !' });
=======
          res.status(200).json({
            CustomerId: Customer._id,
            token: jwt.sign(
              { CustomerId: Customer._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }))
}

//forgot password 
exports.forgotPassword = async (req, res, next) => {
  Customer.findOne({ email: req.body.email })
    .then(Customer => {
      if (Customer) {
        let token = token.findOne({ CustomerId: Customer._id });
        if (!token) {
          token = new token({
            CutomerId: Customer._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
        }
        const link = `${process.env.BASE_URL}/password-reset/${Customer._id}/${token.token}`;
        sendEmail(user.email, "Password reset", link);
        return res.status(200).json({ message: 'An email have been sent !' });

      } else {
        return res.status(401).json({ error: 'Customer not found !' });

      }

    })

} 

//reset password
/* exports.resetPassword = async (req, res) => {
  try {
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const CustomerId = decodedToken.CustomerId;
    if (req.body.CustomerId && req.body.CustomerId !== CustomerId)
      updatedCustomer = Customer.updateOne(
        { _id: req.params.id },
        {
          $set: {
            password: req.body.hashedPAssword,
          }
>>>>>>> d3d76ebe94020c50799527533aad6f983172f636
        }
        res.status(200).json({
            CustomerId: Customer._id,
          token: jwt.sign(
            { CustomerId: Customer._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          )
        });
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error })) 
}
