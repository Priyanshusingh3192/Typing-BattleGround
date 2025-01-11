const whitelist=[
    'https://www.example.com',
    'http://localhost:3500',
    'http://localhost:3001',
    'http://172.29.50.69:3500',
    'http://172.29.50.69:3000',
    'https://www.google.com']
    const allowedOrigin=require('./allowedOrigin')
const corsOption={
    //credentials: true,
    origin: true,
    credentials: true,
   origin:(origin,callback) =>{
    if(allowedOrigin.indexOf(origin)!==-1||!origin){
        callback(null,true)
    }else{
        callback(new Error('Not allowed by cors'))
    }
   },

   optionsSuccessStatus:200
}
module.exports=corsOption