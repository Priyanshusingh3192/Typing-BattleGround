const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
  
    otp:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    time:{
        type:Date,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    pwd: {
        type: String,
        required: true
    },
    picture:{
        type:String,
        default:"xx",
        required:false
    },
  
});
const otp=new mongoose.model("otp_new",userSchema);
module.exports=otp
