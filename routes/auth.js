
const router=require("express").Router();
const bcrypt=require("bcryptjs")
const User=require("../model/user");
const rounds=10;

router.get("/login",(req,res)=>{

});

router.post("/register",(req,res)=>{
    bcrypt.hash(req.body.password,rounds,(error,hash)=>{
        if(error) res.status(500).json(error)
        else{
            const newUser=User({email:req.body.email,password:hash})
            newUser.save()
                .then(user=>res.status(200).json(user))
                .catch(error=>{
                    res.status(500).json(error)
                })
        }
    })
});

module.exports=router;
