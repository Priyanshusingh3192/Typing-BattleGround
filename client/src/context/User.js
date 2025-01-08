const express=require('express')
const router=express()
// const registerController=require('../controllers/registerController')
// const otpController=require('../controllers/otpController')

router.post('/register',otpController)

// router.post('/otp',registerController.handleNewUser)
module.exports=router