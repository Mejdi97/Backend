const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const CustomerSchema = new mongoose.Schema({

  wallet_address: {
    type: String,
  },
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  bio: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
  },
  social_media_accounts: {
    type: [String]
  },
  profile_picture: {
    type: String
  },
  couverture_picture: {
    type: String
  }
  ,
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date,
    required: false

  }

}, { timestamps: true })

CustomerSchema.pre('save', function (next) {
  const customer = this;

  if (!customer.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(customer.password, salt, function (err, hash) {
      if (err) return next(err);

      customer.password = hash;
      next();
    });
  });
});


CustomerSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

CustomerSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    wallet_address: this.wallet_address,
    name: this.name,
    email: this.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  });
};

CustomerSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

mongoose.set('useFindAndModify', false);


module.exports = mongoose.model('Customer', CustomerSchema)