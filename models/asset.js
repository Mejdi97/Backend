const mongoose = require('mongoose')


const AssetSchema = new mongoose.Schema({

owner:{
    type: String
},
name_asset : {
    type: String,
    required: true
},
description:{
    type:String
},
bids:{
    type:Boolean
},
instant_sale:{
    type:Boolean
},
price:{
    type:Number
}
})
module.exports = mongoose.model('asset', AssetSchema)