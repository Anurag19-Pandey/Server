const User = require('../db/model/userModel') ;

module.exports.Register = async(req,res)=>{

    try{

        console.log(req.body) ;
        const {name , password} = req.body ;

        const new_user = await User.create({
            name : name  ,
            password : password
        })

        console.log("Created") ;

        return res.status(201).json({status : true , user : new_user}) ;
        
    }
    catch(err){
        console.log(err) ;
    }
}

module.exports.Login = async(req,res)=>{

    try{

        const {name , password} = req.body ;
        console.log(name)
        const user = await User.findOne({name : name}) ;


        if(!user){
            return res.status(401).json({status : false }) ;
        }
        
        if(user.password == password)
            return res.status(200).json({status : true , user : user}) ;
    }
    catch(err){
        console.log(err) ;
    }
}

module.exports.userChat = async(req,res)=>{
    try{

        console.log('User Chat') ;


       const id = req.params.id ;
        console.log(id) ;
       const chat = await User.findOne({_id : id}) ; 
       
       console.log(chat.message) ;

       return res.status(200).json({messages : chat.message}) ;

        
    }catch(err){
        console.log(err) ;
    }
}