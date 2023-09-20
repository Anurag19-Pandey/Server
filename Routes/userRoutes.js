const express = require('express') ;

const router = express.Router() ;

const {Register , Login , userChat} = require('../controllers/userController') ;

router.post('/register' , Register) ;

router.post('/login' , Login) ;

router.get('/userchat/:id' , userChat) ;

module.exports = router ;
