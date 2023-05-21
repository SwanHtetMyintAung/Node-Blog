const jwt = require('jsonwebtoken')
function createToken(id , maxAge){
    return jwt.sign({id}, process.env.SECRET_KEY , {
        expiresIn : maxAge
    })
}
module.exports = createToken;