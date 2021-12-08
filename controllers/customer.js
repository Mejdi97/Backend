const Customer = require('../models/Customer');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");




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
      password: req.body.password,
      social_media_accounts: req.body.social_media_accounts

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
          let link = "http://" + req.headers.host + "/customers/reset/" + customer.resetPasswordToken;

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
            Please click on the following link ${link} to reset your password. \n\n 
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          res.status(200).json({ message: 'A reset email has been sent to ' + customer.email + '.' });
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

        // send email

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
          subject: "Your password has been changed",
          text: `Hi ${customer.name} \n 
                  This is a confirmation that the password for your account ${customer.email} has just been changed.\n`
        };


        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        next();
      });
    });
};




