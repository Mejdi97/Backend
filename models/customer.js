const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({

  wallet_address: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required : true
  },
  url: {
    type: String,
  },
  bio: {
    type: String
  },
  email:{
    type : String
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
  resetLink:{
    type:String
  }

})

const validate = (user) => {
  const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
  });
  return schema.validate(user);
};



module.exports = mongoose.model('Customer', CustomerSchema)
module.exports= {validate}