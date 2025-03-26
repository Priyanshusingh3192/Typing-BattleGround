const express=require('express')
const router=express()
const matchController=require('../controller/matchController')

router.post('/savedata',matchController.storeData);

router.post('/getdata',matchController.getData);
module.exports=router;