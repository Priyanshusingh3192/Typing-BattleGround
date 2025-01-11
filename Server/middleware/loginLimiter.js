const rateLimit=require('express-rate-limit')
const {logEvents}=require('./logEvents')

const loginLimiter=rateLimit({
    windowMs:60*100000,//1 minute
    max:55555555,
    message:{message:'too many login attempts from this ip try again'},
    handler:(req,res,next,options)=>{
        logEvents(`Too many requests: ${options.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,'errlog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders:true,//return limit in the rate limit-* header

    legacyHeaders:false,//disable x-ratelimit-* header

})
module.exports=loginLimiter