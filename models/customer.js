const mongoose = require('mongoose')
const asset = require('./asset')

const CustomerSchema = new mongoose.Schema({

  wallet_address: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  bio: {
    type: String
  },
  protfolio: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'asset'
  },

  social_media_accounts: [String],

  profile_picture: {
    type: String
  }

})

module.exports = mongoose.model('Customer', CustomerSchema)