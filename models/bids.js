const mongoose = require('mongoose')



const bidsSchema = new mongoose.Schema({

    asset_id: {
        type: String
    },
    entrance_date: {
        type: Date,
        default: Date.now
    },
    closure_date: {
        type: Date
    },
    entrance_price: {
        type: Number
    },
    last_price: {
        type: Number
    }

})




module.exports = mongoose.model('Bids', bidsSchema)