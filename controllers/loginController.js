const USER = require('../models/User')

function login(req,res){
    const data = req.body;
    console.log(req.session)
    USER.find(req.body)
    .then(result =>{
        if(result.length != 0) {
            res.send(result)
        }else{
            res.send('No Document Found')
        }
    })
    .catch(err => res.send(err))
}

module.exports = {
    login
}