const INFO = require('../models/Info');
const USER = require('../models/User')
const mongoose = require('mongoose')

async function getOnlyOneBlog(req,res){
    let searchId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(searchId)){
        res.status(404).render('404' , {title : "404"});
        return;
    }
    let singleBlog = await INFO.findById(searchId);
    let singleUser = await USER.find({name:singleBlog.author})
    res.render('blog/blogInfo' , {title:singleBlog.title , info : singleBlog , blogAuthor : singleUser[0] })
}

async function getOnlyOneUser(req,res){
  let searchId = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(searchId)){
      res.status(404).render('404' , {title : "404"});
      return;
  }
  let oneUser = await USER.findById(searchId)
  if(oneUser){
    let infos = await INFO.find({author : oneUser.name})
    res.render('user/userInfo' , {
      title : oneUser.name , 
      infos , 
      oneUser})
  }
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
async function deleteOnlyOneUser(req,res){
  const id = req.params.id;
  const deletedUser = await USER.findByIdAndDelete(id);
  if(deletedUser != undefined){
    const author = deletedUser.name;
    const deletedBlogs = await INFO.deleteMany({author})
    res.json({ redirect: '/' })
  }else{
    res.json({ redirect:'/404'})
  }
}

module.exports = {
    getOnlyOneBlog,
    getOnlyOneUser,
    deleteOnlyOneBlog,
    deleteOnlyOneUser,
}