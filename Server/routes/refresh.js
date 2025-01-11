const express=require('express')
const router=express()
const refreshController=require('../controller/refreshController')
router.get('/',refreshController.handleRefreshToken)
module.exports=router