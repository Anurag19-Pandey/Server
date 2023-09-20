const mongoose = require('mongoose') ;

const connection = () =>{
    mongoose.connect("mongodb+srv://Anurag19pandey:Anurag192%40atlas@nodejstaskmanager.1wftj.mongodb.net/chat-app",{
        useNewUrlParser : true ,
    }).then(() =>{
        console.log('Connected to database') ;
    }).catch((err) =>{
        console.log(err) ;
    })
}

module.exports = connection ;
