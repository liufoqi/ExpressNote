const mongoose = require("mongoose")
const Schema=mongoose.Schema

const  article=new mongoose.Schema({
    content:String,
      title:String,
    contentText:String,
    category:{
    type:Schema.Types.ObjectId,
    ref:'category'
    } ,
    author:{
    type:Schema.Types.ObjectId,
    ref:'user'
    },
    readnumber:{
        type:Number 
    }, 
    comonnum:{
        type:Number
    }
},{versionKey:false, timestamps:{createdAt:'createTime'
,updatedAT:'updateTime'}})
module.exports=mongoose.model("article",article) 