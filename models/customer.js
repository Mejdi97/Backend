const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({

  wallet_address: {
    type: String,
    required: true
  },
  password : {
    type:String,
  },
  name: {
    type: String,
  },
  bio: {
    type: String 
  },
  protfolio: {
    type:String
  },
  social_media_accounts :{
    type:String
  }

})

module.exports = mongoose.model('Customer', CustomerSchema)