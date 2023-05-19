const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//models
const INFO = require('./models/Info');

//controllers
const getControllers = require('./controllers/getController')
const postControllers = require('./controllers/postController')
const idControllers = require('./controllers/idController')
const loginController = require('./controllers/loginController')

//database url
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(result => app.listen(process.env.PORT || 3000))
.catch(err => console.log(err))

//necessary things
app.use(express.static('public'))
app.set('view engine' , 'ejs')
app.use(express.urlencoded( {extended : true}))

// Routes Started
app.get('/' , getControllers.indexController)
//Sign Up
app.get('/user/sign-up' , getControllers.signupController)
//upload pages
app.get('/blog/upload',getControllers.uploadController)
//Get All Users
app.get('/users',getControllers.userController)
//get a video by id
app.get('/blog/:id',idControllers.getOnlyOne)
//post request
app.post('/blog/upload',postControllers.uploadController)
app.post('/user/sign-up',postControllers.userController)
//login request
app.get('/user/login',getControllers.loginController)
app.post('/user/login', loginController.login)
//delete request
app.delete('/blog/:id', idControllers.deleteOnlyOne)
//error 404 
app.use((req , res)=>{
    res.status(404).render('404' , {title : "404"});
})


