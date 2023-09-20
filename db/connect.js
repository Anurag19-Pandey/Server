const mongoose = require('mongoose') ;

const connection = () =>{
    mongoose.connect("mongodb://localhost:27017/chat-app",{
        useNewUrlParser : true ,
    }).then(() =>{
        console.log('Connected to database') ;
    }).catch((err) =>{
        console.log(err) ;
    })
}

module.exports = connection ;
