const mongoose = require("mongoose")


const schemas = new mongoose.Schema({
    originalname:{
        type:String
    },
    mimetype: {
        type: String
    },
    filename: {
        type: String
    },
    path: {
        type: String
    },
    size: {
        type: Number
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    password:{
        type:String
    },
    confirmPassword:{
        type:String
    },
    checkbox:{
        type:String
    }
    
  
})

module.exports=mongoose.model("schema",schemas)

