const mongoose = require('mongoose')



const bidsSchema = new mongoose.Schema({

    token_id: {
        type: String
    },
    entry_date: {
        type: Date,
        default: Date.now
    },
    closure_date: {
        type: Date
    },
    entry_price: {
        type: Number
    },
    last_price: {
        type: Number
    }

})




module.exports = mongoose.model('Bids', bidsSchema)