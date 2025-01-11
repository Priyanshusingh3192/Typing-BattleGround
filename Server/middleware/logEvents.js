//const {format}=require('date-fns')
//console.log(format(new Date(),'yyyyMMdd\tHH:mm:ss'))

console.log(new Date())
const fs=require('fs')
const fsPromises=require('fs').promises
const path=require('path')
const {v4:uuid}=require('uuid')
//console.log(uuid())
const logEvents=async (message,file)=>{
    const dateTime=new Date()
    const logItem=`${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem)
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',file),logItem)

    }catch(err){
        console.error(err)
    }
}
const logger=(req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    console.log(`${req.method}${req.path}`)
    next()
}
module.exports={logEvents,logger}


