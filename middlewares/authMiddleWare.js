const jwt = require('jsonwebtoken')
require('dotenv').config();

function authMiddleWare(req,res,next){
    let token = req.cookies.JWT;
    if(token){
        jwt.verify(token , process.env.SECRET_KEY,(err,decodedToken)=>{
            if(err){
                console.log(err.message)
                res.redirect('/user/sign-up')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.redirect('/user/sign-up')
    }
    
}
module.exports = authMiddleWare
