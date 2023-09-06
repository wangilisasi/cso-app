
const router=require("express").Router();
const bcrypt=require("bcryptjs");
const User=require("../model/user");
const rounds=10;

const jwt = require("jsonwebtoken");
const tokenSecret="my-token-secret"

const middleware = require('../middleware')

router.post("/login",(req,res)=>{
    User.findOne({email:req.body.email})
        .then(user=>{
            if(!user) res.status(404).json({error:"no user with that email found"})
            else{
                bcrypt.compare(req.body.password,user.password,(error,match)=>{
                    if(error) res.status(401).json(error)
                    else if(match){ 
                        const token={token_id:generateToken(user)}
                        console.log({user})   
                        res.status(200).json({user,token})
                    }
                    else res.status(403).json({error:"passwords do not match"})
                })
            }
        })
        .catch(error=>{
            res.status(500).json(error)
        })
});


router.post("/register",(req,res)=>{
    console.log(req.body.email)
    console.log(req.body.password)
    bcrypt.hash(req.body.password,rounds,(error,hash)=>{
        if(error) res.status(500).json(error)
        else{
            const newUser=User({email:req.body.email,password:hash})
            newUser.save()
                .then(user=>res.status(200).json({token:generateToken(user)}))
                .catch(error=>{
                    res.status(500).json(error)
                })
        }
    })
});

function generateToken(user){
    return jwt.sign({data:user},tokenSecret,{expiresIn:"24h"})
}

module.exports=router;
