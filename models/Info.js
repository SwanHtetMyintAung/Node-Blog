const mongoose = require('mongoose');
const Schema = mongoose.Schema ; 

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
},{timestamps : true })

//mongoose hooks
infoSchema.post('save' , function(doc , next){
    next()
})

const info = mongoose.model('info' , infoSchema)

module.exports = info ; 