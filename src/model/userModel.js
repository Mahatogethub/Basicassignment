const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({

Name :{
    type : String ,
    required : true ,
} ,
Email : {
    type : String ,
    unique: true ,
    required : true 
},

Age : {
    type : Number ,
    required: true ,
},

Address : {
     type : String ,
     required : true
},

isDeleted :{
    type : Boolean ,
    default : false ,
}


}, {timestamps : true})


module.exports = mongoose.model('user' , userSchema)