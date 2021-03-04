const router=require("express").Router()
const middleware=require("../middleware")



    router.get('/', middleware.verify , (req, res) => {
        res.status(200).json({user:req.user})
    })
    
    function generateToken(user){
        return jwt.sign({data:user},tokenSecret,{expiresIn:"24h"})
    }

    

module.exports=router;
