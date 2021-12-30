const mongoose = require('mongoose')



const likeSchema = new mongoose.Schema({

    token_id :{
        type:String
    },
    likers: [{ type: mongoose.Schema.ObjectId, ref: "Customer" }]

})

module.exports = mongoose.model('Like', likeSchema)