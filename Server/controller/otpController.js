const express = require('express');
const router = express.Router()
const users = require('../model/User')

var validator = require("email-validator");

const { passwordStrength } = require('check-password-strength')

const sendEmail=require('./emailController')
const bcrypt=require('bcryptjs')

const otp=require("../model/otpSchema")

const handleOtp = async (req, res) => {
    console.log(req.body);
      const { name, email,pwd,username } = req.body

    var m=1;
   const token=pwd;
    console.log(name)
    if(validator.validate(email)){
        if(passwordStrength(token).value==='Strong'||passwordStrength(token).value==='Medium'){
    try {

        const preuser = await users.findOne({ email: email })
        const preuser1 = await users.findOne({ username: username })
        console.log(preuser)
        console.log("otp creation section")
        if(preuser||preuser1){
            res.status(404).send("This user already exists")
            console.log("This user already exist")
        }
        else{
            // const adduser=new users({
            //     name,email,pwd,username
            // })

console.log("otp creation section")

const salt=await bcrypt.genSalt(10)
const secPas=await bcrypt.hash(pwd,salt)

            const d=new Date()
  // const {email}=req.body
   otp5=Math.floor(100000 + Math.random() * 900000)
    const otp1=new otp({
        otp:otp5,email:email,time:d,name:name,pwd:secPas,username:username,
    
       })
      
   const otp2=await otp.find({email:email})
   console.log(otp2)
   if(otp2.length){
    
    const upd=await otp.updateOne({email:email},{$set:{
        otp:otp5,email:email,time:d,name:name,pwd:secPas,username:username,
    
       }});

    await sendEmail("",otp5,email,"",email,false)

    res.sendStatus(201)
    console.log("updated")
   }else{
    try {  
           const k1= await otp1.save();
           const k2= await sendEmail("",otp5,email,"",email)
            console.log("success")
            res.sendStatus(202)

        }catch(error){
            console.log(error)
            res.sendStatus(404).send("Error otp creation")
        }
    }
           // await adduser.save();
           // res.status(201).json(adduser)
            console.log(adduser)

        }
    } catch (error) {
        //res.status(404).send(error)
        console.log(error)
    }}else{
        res.status(404).send("Weak Password")
    }

}else{
        res.status(404).send("Email Not valid")
    }


}
module.exports=handleOtp
