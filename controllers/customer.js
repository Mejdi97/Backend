const Customer = require('../models/Customer');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const customer = require('../models/Customer');




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

  try {

    //const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const customer = new Customer({
      wallet_address: req.body.wallet_address,
      name: req.body.name,
      url: req.body.url,
      bio: req.body.bio,
      email: req.body.email,
      //password: req.body.password,
      social_media_accounts: req.body.social_media_accounts,
      profile_picture: req.files['profile_picture'][0].path,
      couverture_picture: req.files['couverture_picture'][0].path

    })
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

//update customer

exports.updateCustomer = async (req, res) => {
  const customer = new Customer({
    _id: req.params.id,
    wallet_address: req.body.wallet_address,
    name: req.body.name,
    url: req.body.url,
    bio: req.body.bio,
    email: req.body.email,
    social_media_accounts: req.body.social_media_accounts,
    profile_picture: req.files['profile_picture'][0].path,
    couverture_picture: req.files['couverture_picture'][0].path

  });

  Customer.updateOne({ _id: req.params.id }, customer).then(
    () => {
      res.status(201).json({
        message: 'Customer updated successfully!',
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

//delete customer
exports.deleteCustomer = async (req, res) => {
  Customer.deleteOne({ _id: req.params.id }).then(
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



exports.recover = (req, res) => {
  Customer.findOne({ email: req.body.email })
    .then(customer => {
      if (!customer) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.' });
      //Generate and set password reset token
      customer.generatePasswordReset();

      // Save the updated user object
      customer.save()
        .then(customer => {
          // send email
          let link = customer.resetPasswordToken;

          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MY_EMAIL,
              pass: process.env.MY_PASS
            }
          });

          var mailOptions = {
            from: 'nftland251@gmail.com',
            to: customer.email,
            subject: 'Password change request',
            text: `Hi ${customer.name} \n 
            Please copy the following code ${link[0] + link[1] + link[2] + link[3]} and paste it to reset your password. \n\n 
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);

            }
          });

          res.status(200).json({ Token: link });
        })
        .catch(err => res.status(500).json({ message: err.message }));
    })
    .catch(err => res.status(500).json({ message: err.message }));
};



exports.reset = (req, res) => {
  Customer.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
    .then((customer) => {
      if (!customer) return res.status(401).json({ message: 'Password reset token is invalid or has expired.' });

      //Redirect user to form with the email address
      //res.render('reset', {customer});
    })
    .catch(err => res.status(500).json({ message: err.message }));
};


exports.resetPassword = (req, res) => {
  Customer.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
    .then((customer) => {
      if (!customer) return res.status(401).json({ message: 'Password reset token is invalid or has expired.' });

      //Set the new password
      customer.password = req.body.password;
      customer.resetPasswordToken = undefined;
      customer.resetPasswordExpires = undefined;

      // Save
      customer.save((err) => {
        if (err) return res.status(500).json({ message: err.message });
      });
    });
  res.json({ response: "ok" });
}


exports.makeFollow = async (req, res, next) => {
  if (!req.body) {

    return res.status(422).json({ message: 'Follow id is required' })
  }

  const checkAvailable = await customer.findOne({ _id: req.params.id }).exec()
  if (!checkAvailable) {
    return res.json({ message: 'Not found' })
  }


  let checkFollowingAvailable = await checkAvailable.following.find(id => id == req.body._id)
  if (checkFollowingAvailable) {
    return res.json({ message: 'Already following' })
  }


  const createFollowing = await Customer.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { following: req.body._id } },
    { new: true }
  ).exec()

  const createFollower = await Customer.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { followers: req.params.id } },
    { new: true }
  ).exec()

  if (createFollowing && createFollower) {
    return res.status(201).json({ message: 'success' })
  }
}

exports.getFollowers = async (req, res) => {

  Customer.findById(mongoose.Types.ObjectId(req.params.id)
    , (err, customer) => {
      res.json(customer.followers);
      return;
    });
}

exports.getFollowing = async (req, res) => {

  Customer.findById(mongoose.Types.ObjectId(req.params.id)
    , (err, customer) => {
      res.json(customer.following);
      return;
    });
}
