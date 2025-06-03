let mongoose= require('mongoose');
let loginschema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
let loginmodel = mongoose.model("logindetails",loginschema);
module.exports=loginmodel;