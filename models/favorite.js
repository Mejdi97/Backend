const mongoose = require('mongoose')


const favoriteSchema = new mongoose.Schema({

    asset_id : {
        type: String
    }
    
})



module.exports = mongoose.model('favorite', favoriteSchema)