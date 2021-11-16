const mongoose = require('mongoose')


const PaymentSchema = new mongoose.Schema({
    wallet_address:{
        type: String
    },
     
    
    payment_history:{
        type:String
    },
    total:{
        type:Number

    }


})
module.exports = mongoose.model('Payment', PaymentSchema)