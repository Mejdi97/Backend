const mongoose = require('mongoose')



const likeSchema = new mongoose.Schema({

    asset_name :{
        type:String
    },
    number_of_likes:{
        type:Number
        }
})





module.exports = mongoose.model('Like', likeSchema)