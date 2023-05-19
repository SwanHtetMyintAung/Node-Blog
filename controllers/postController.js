const INFO = require('../models/Info');
const USER = require('../models/User.js')
const errorHandler = require('./errorHandler')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();

const maxAge = 60 * 60 * 24 * 3 ;
function createToken(id){
    return jwt.sign({id}, process.env.SECRET_KEY , {
        expiresIn : maxAge
    })
}


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
        const token = createToken(result._id)
        res.cookie('JWT' , token , { httpOnly : true ,maxAge : maxAge * 1000})
        res.redirect('/users')
    })
    .catch(err =>{
        if(err.code == 11000){
            let errorValue = errorHandler(err.keyValue , err.code)
            res.send(errorValue)
        }
        console.log(err)
        
    });
}

module.exports = {
    uploadController,
    userController
}