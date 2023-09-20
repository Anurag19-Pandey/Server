
const express = require('express') ;
const app = express() ;
const http = require('http') ;
const cors = require('cors') ;
const {Server} = require('socket.io') ;
const userRoute = require('./Routes/userRoutes') ;
const bodyParser = require('body-parser') ;
const connection = require('./db/connect');
const User = require('./db/model/userModel') ;

app.use(express.json()) ;
app.use(bodyParser.urlencoded({extended : true})) ;

// using cors
app.use(cors({
    origin : ["https://650add5214afff45e63abbcd--phenomenal-dieffenbachia-7d7de1.netlify.app/" , "https://650ada0580bf48069613b0c4--storied-melomakarona-f61c86.netlify.app/"] ,
    methods : ["GET" , "PUT" , "POST"]
})) ;

// establishing route
app.use('/' , userRoute) ;

const server = http.createServer(app) ;

const io = new Server(server , {
    cors : {
        origin : ["https://650add5214afff45e63abbcd--phenomenal-dieffenbachia-7d7de1.netlify.app/" , "https://650ada0580bf48069613b0c4--storied-melomakarona-f61c86.netlify.app/"] ,
        credentials : true
    }
}) ;

io.on("connection"  ,(socket)=>{

    console.log(socket.id) ;

    socket.on("send_message" , async(data)=>{
         const info = await User.findOneAndUpdate({_id: data.author._id},{
            $push:{
                message : {
                    message : data.msg ,
                    send_by_user : true 
                }
            }
        },{
            new : true
        }) ;

        io.emit("sending_to_client2" , info) ;

    }) ;


    socket.on("receive_message" , async(data) =>{
        console.log(data) ;
        const info = await User.findOneAndUpdate({_id: data.room},{
            $push:{
                message : {
                    message : data.msg ,
                    send_by_user : false 
                }
            }
        },{
            new : true
        }) ;

        console.log(info.message) ;
        io.emit("receiver_from_client2" , info.message) ;
    })
    // console.log(socket.id) ;

    // socket.on("send_message" , async(data)=>{
    //     console.log(data) ;
    //     const info = await User.updateOne({_id : data.author._id},{
    //         $push:{
    //             message : {
    //                 message : data.msg ,
    //                 send_by_user : true
    //             }
    //         }
    //     }) ;
        
    //     console.log(info) ;

    //     io.emit("sending_to_client2" , data) ;

    //     io.on("client2_send_message" , (data)=>{
    //         console.log(data) ;
    //     })
        
    // }) ;

    // socket.on("client2_send_message",(data)=>{
    //     console.log("This is "+data) ;
    // }) ;


    socket.on("disconnect" , () =>{
        console.log("user disconnected") ;
    }) ;
});

server.listen(5000 , () =>{
    console.log(`Server is running `) ;
    connection() ;
}) 