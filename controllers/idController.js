const INFO = require('../models/Info');
const mongoose = require('mongoose')

function getOnlyOne(req,res){
    let searchId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(searchId)){
        res.status(404).render('404' , {title : "404"});
        return;
    }
    INFO.findById(searchId)
    .then(result =>{
        res.render('blogInfo' , {title:"blog" , info : result})
    })
    .catch(err => console.log(err))
}

function deleteOnlyOne(req,res){
    const id = req.params.id;
    INFO.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/' });
      })
      .catch(err => {
        console.log(err);
      });
}

module.exports = {
    getOnlyOne,
    deleteOnlyOne
}