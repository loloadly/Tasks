const mongoose = require('mongoose');
var moment = require('moment');
// const validator = require('validator')
const newsSchema = mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true,
        trim:true

    },
    description:{
        type:String,
        trim:true

    },
    author:{
        type:String,
        required:true,
        // uppercase:true,
        trim:true
    },
    reporter:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Reporter"
    },
    image:{
      type:Buffer
    }
    // date: { 
    //     type: Date, 
    //     default: function(){
    //         return moment().add(2, 'hour');
    //     }
    // }
},{timestamps:true})

newsSchema.methods.toJSON = function(){
    const news = this
    const newsObject = news.toObject()
    delete newsObject.updatedAt
    return newsObject
}


const News = mongoose.model("News",newsSchema)
module.exports = News