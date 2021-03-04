const jwt=require("jsonwebtoken")
const tokenSecret="my-token-secret"

exports.verify=(req,res,next)=>{
    const token=req.headers.authorization
    console.log(token)
    if(!token) res.status(401).json({error:"please provide a token"})
    else{
        jwt.verify(token.split(" ")[1],tokenSecret,(err,value)=>{
            if(err) res.status(401).json({error:"failed to authenticate token"})
            if(value){
                req.user=value.data
            }
            next()
        })
    }
}