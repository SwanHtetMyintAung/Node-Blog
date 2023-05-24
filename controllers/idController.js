const INFO = require('../models/Info');
const USER = require('../models/User')
const mongoose = require('mongoose')

function getOnlyOneBlog(req,res){
    let searchId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(searchId)){
        res.status(404).render('404' , {title : "404"});
        return;
    }
    INFO.findById(searchId)
    .then(result =>{
        res.render('blog/blogInfo' , {title:"blog" , info : result })
    })
    .catch(err => console.log(err))
}

function getOnlyOneUser(req,res){
  let searchId = req.params.id;

  if(!mongoose.Types.ObjectId.isValid(searchId)){
      res.status(404).render('404' , {title : "404"});
      return;
  }
  USER.findById(searchId)
  .then(result =>{
      res.render('user/userInfo' , {title : result.name , info : result})
  })
  .catch(err => console.log(err))
}

function deleteOnlyOneBlog(req,res){
    const id = req.params.id;
    INFO.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/' });
      })
      .catch(err => {
        console.log(err);
      });
}
function deleteOnlyOneUser(req,res){
  const id = req.params.id;
  USER.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/users' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
    getOnlyOneBlog,
    getOnlyOneUser,
    deleteOnlyOneBlog,
    deleteOnlyOneUser,
}