const INFO = require('../models/Info');
const USER = require('../models/User')

function indexController(req,res){
    INFO.find()
    .then((result) =>{
        res.render('index' , { title : "All Songs" , infos : result });
    })
    .catch(err => console.log(err.value))
}
function loginController(req,res){
    res.render('login' , {title : "Login"});
}
function signupController(req,res){
    res.render('signup' , {title : "Sign-Up"});
}
function uploadController(req,res){
    console.log(req.session)
    res.render('upload' , {title : "Upload"});
}
function userController(req,res){
    USER.find()
    .then((result) =>{
        res.render('users' , { title : "All User" , infos : result });
    })
    .catch(err => console.log(err))
}
module.exports = {
    indexController , 
    loginController ,
    signupController,
    uploadController,
    userController
}  
