const INFO = require('../models/Info');
const USER = require('../models/User');
let jwt = require('jsonwebtoken')

function redirectToIndex(req,res){
    res.redirect('/blogs')
}
function indexController(req,res){
    INFO.find()
    .then((result) =>{
        res.render('blog/index' , { title : "All Songs" , infos : result });
    })
    .catch(err => console.log(err.value))
}
function signupController(req,res){
    res.render('user/signup' , {title : "Sign-Up"});
}
function uploadController(req,res){
    console.log(req.session)
    res.render('blog/upload' , {title : "Upload"});
}
function userController(req,res){
    USER.find()
    .then((result) =>{
        res.render('user/users' , { title : "All User" , infos : result });
    })
    .catch(err => console.log(err))
}
function loginController(req,res){
    res.render('user/login' , {title : "Login"});
}
function logoutController(req,res){
    res.cookie('JWT','',{maxAge : 1})
    res.redirect('/')
} 
module.exports = {
    redirectToIndex,
    indexController , 
    signupController,
    uploadController,
    userController,
    loginController,
    logoutController
    
}  
