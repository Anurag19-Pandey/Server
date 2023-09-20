const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({

    name :{
        type:String 
    },
    password : {
        type:String
    },
    message :{
        type : Array
    }

}) ;

const User = mongoose.model('User' , userSchema) ;

module.exports = User ;