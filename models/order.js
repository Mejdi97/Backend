const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    buyer_wallet_address:{
        type:String
    },
    seller_wallet_address:{
        type:String
    },
    seller_name:{
        type:String
    },
    buyer_name:{
        type:String
    },
    asset_name:{
        type:String
    }
})


module.exports = mongoose.model('Order', orderSchema)