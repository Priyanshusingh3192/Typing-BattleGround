const express=require('express')
const router=express()
const registerController=require('../controller/registerController')
const otpController=require('../controller/otpController')

router.post('/register',otpController)

router.post('/otp',registerController.handleNewUser)
module.exports=router