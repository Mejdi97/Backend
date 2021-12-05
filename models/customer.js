const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({

  wallet_address: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
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
  resetLink: {
    type: String
  }

})



module.exports = mongoose.model('Customer', CustomerSchema)
