const jwt = require('jsonwebtoken');
const USER = require('../models/User');
const mongoose = require('mongoose')
const handleCustomErrors  = require('../middlewares/404')
require('dotenv').config();

function requireAuth(req, res, next) {
  let token = req.cookies.JWT;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        if (err.message == 'jwt expired') {
          res.cookie('JWT', '', { maxAge: 1 });
        }
        res.redirect('/user/sign-up');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/user/sign-up');
  }
}
function checkUser(req, res, next) {
  let token = req.cookies.JWT;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY,async (err, decodedToken) => {
      if (err) {
          res.locals.user = null
          next()
      }else {
          res.locals.user = await USER.findById(decodedToken.id)
          next();
      }
    });
  } else {
      res.locals.user = null;
    next()
  }
}
const validateUserId = (req, res, next) => {
  const id = req.params.id;

  // Check if the ID is a valid MongoDB ObjectID
  if(mongoose.Types.ObjectId.isValid(id)) {
    next()
  }else{
    handleCustomErrors(req,res,next)
  }

  // Continue to the next middleware or route
};
module.exports = {
    requireAuth,
    checkUser,
    validateUserId
};
