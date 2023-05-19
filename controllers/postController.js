const INFO = require('../models/Info');
const USER = require('../models/User.js')
const errorHandler = require('./errorHandler')

function uploadController(req,res){
    let data = req.body;
    let newThingToSave = new INFO({
        title: data.title,
        author: data.author,
        body: data.body
    })
    newThingToSave.save()
    .then(result=> res.redirect('/'))
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
    req.session.userId = newThingToSave._id
    newThingToSave.save()
    .then(result=> res.redirect('/users'))
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