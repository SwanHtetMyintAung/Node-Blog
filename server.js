const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//middle wares
const authMiddleWare = require('./middlewares/authMiddleWare')


//controllers
const getControllers = require('./controllers/getController')
const postControllers = require('./controllers/postController')
const idControllers = require('./controllers/idController')
const handleCustomErrors  = require('./middlewares/404')

//database url
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(result => app.listen(process.env.port || 3000))
.catch(err => console.log(err))

//necessary things
app.use(express.static('public'))
app.set('view engine' , 'ejs')
app.use(express.urlencoded( {extended : true}))
app.use(cookieParser());
app.use(authMiddleWare.checkUser)

// Routes Started
/*------------------Get Request------------------------- */
app.get('/',getControllers.redirectToIndex)
app.get('/blogs', getControllers.indexController)
app.get('/user/sign-up' , getControllers.signupController)
app.get('/blog/upload',getControllers.uploadController)
app.get('/user/login',getControllers.loginController)
app.get('/users',getControllers.userController)
app.get('/user/logout',getControllers.logoutController)

//post request
app.post('/blog/upload',postControllers.uploadController)
app.post('/user/sign-up',postControllers.userController)
app.post('/user/login', postControllers.loginController)
app.post('/blog/:id' , postControllers.commentController)

//routes with id
app.get('/blog/:id',authMiddleWare.validateUserId,idControllers.getOnlyOneBlog)
app.get('/user/:id',authMiddleWare.validateUserId,idControllers.getOnlyOneUser)
app.delete('/blog/:id',authMiddleWare.validateUserId, idControllers.deleteOnlyOneBlog)
app.delete('/user/:id',authMiddleWare.validateUserId, idControllers.deleteOnlyOneUser)

//error 404 
// 404 Error Handler
app.use((req, res, next) => {
    handleCustomErrors(req, res, next);
});
  
