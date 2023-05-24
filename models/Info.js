const mongoose = require('mongoose');
const Schema = mongoose.Schema ; 

const commentSchema = new mongoose.Schema({
    author: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
  });
  
const infoSchema = new Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    comments:[
        {
          user:{
            type:String
          },
          text: {
            type:String,
            min:1
          },
          createdAt: { type: Date, default: Date.now }
        }
      ]
},{timestamps : true })

//mongoose hooks
infoSchema.post('save' , function(doc , next){
    next()
})

const info = mongoose.model('info' , infoSchema)

module.exports = info ; 