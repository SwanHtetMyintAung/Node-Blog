const INFO = require('../models/Info');
const USER = require('../models/User.js')
const errorHandler = require('./errorHandler')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();

const maxAge = process.env.MAX_AGE;
const createToken = require('./createToken')

function uploadController(req,res){
    let data = req.body;
    let newThingToSave = new INFO({
        title: data.title,
        author: data.author,
        body: data.body
    })
    newThingToSave.save()
    .then(result=>res.redirect('/'))
    .catch(err =>{
        let destination = err.errors.body.properties;
        let errorValue = errorHandler(destination.path , destination.type)
        res.send(errorValue)
    });
}
function userController(req,res){
    let data = req.body;
    let newThingToSave = new USER({
        name: data.name,
        email: data.email,
        password: data.password
    })
    newThingToSave.save()
    .then(result=> {
        const token = createToken(result._id , maxAge)
        res.cookie('user',result._id,{maxAge : maxAge * 1000})
        res.cookie('JWT' , token , { httpOnly : true ,maxAge : maxAge * 1000})
        res.redirect('/')
    })
    .catch(err =>{
        if(err.code == 11000){
            let errorValue = errorHandler(err.keyValue , err.code)
            res.send(errorValue)
        }
        console.log(err)
        
    });
}
async function loginController(req,res){
    const {email , password} = req.body;
    try{
        const user = await USER.login(email , password)
        res.cookie('user',user,{maxAge : maxAge * 1000})
        const token = createToken(user._id , maxAge)
        res.cookie('JWT' , token , { httpOnly : true ,maxAge : maxAge * 1000})
        res.redirect('/users')
    }catch(err){
        console.log(err)
    }
    
}
module.exports = {
    uploadController,
    userController,
    loginController,
}