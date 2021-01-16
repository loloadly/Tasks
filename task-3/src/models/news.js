const mongoose = require('mongoose');
var moment = require('moment');
const validator = require('validator')
const News = mongoose.model("News",{
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
        uppercase:true,
        trim:true
    },
    date: { 
        type: Date, 
        default: function(){
            return moment().add(2, 'hour');
        }
    },   

    // date:{
    //     type:Date,
    //     required: true,
    //     default:Date.now, 
    // }, 
})






module.exports = News