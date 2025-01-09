
const bcrypt = require('bcrypt');
const users=require('../model/User')
const otp=require("../model/otpSchema")
const handleNewUser=async(req,res)=>{

    var {otp5,email} =req.body 
    // console.log("i am: ",req.body," otp5: ",otp5);
    

try{
    const tm= await users.find({email:email});
console.log(tm);
console.log("hbn")
if(tm.length){
    res.status(401).send("User already exists");
}
}catch(err){
    console.log(err);
}
    try{
    const otp3=await otp.find({otp:otp5,email:email})
    console.log("hi")
    console.log(otp3.name)
   
   
    if(otp3.length>0){
    const interval=((new Date())-otp3[0].time)/60000
    console.log(interval)
    if(interval>10){
        console.log("Otp expired")
        res.status(401).send("otp expired")
    }
    else{
        const adduser=new users({
            name:otp3[0].name, email:otp3[0].email,picture:otp3[0].picture,pwd:otp3[0].pwd,username:otp3[0].username
        
        })
        console.log("otp accepted")
        
        await adduser.save();
        res.status(200).send("Otp Accepted")

    }}
    else{
        console.log("wrong otp")
        res.status(404).send("wrong otp")
    }

    console.log(otp3)}
    catch(error){
        console.log(error)
    }

}


module.exports = { handleNewUser };