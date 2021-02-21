const router=require("express").Router();
const cloudinary=require("../utils/cloudinary");
const upload=require("../utils/multer");
const User=require("../model/cso")

router.post("/", upload.single("image"), async(req,res)=>{
    try{
        
        console.log(req.body.name)
        console.log(req.body.description)
        console.log(req.body.latitude)
        console.log(req.body.longitude)
        console.log(req.body.region)

        const result=await cloudinary.uploader.upload(req.file.path);

        //Create new user
        let user=new User({
            name:req.body.name,
            description:req.body.description,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            region:req.body.region,
            avatar:result.secure_url,
            cloudinary_id:result.public_id
        });
        //Save user
        await user.save();
        res.json(user);
    }catch (err){
        console.log(err)
    }
})

router.get("/",async(req,res)=>{
    try{
        let user=await User.find();
        res.json(user)
        
    }catch (err){
        console.log(err);
    }
})


router.delete("/:id", async(req,res)=>{
    try{
        //Find user by ID
        let user=await User.findById(req.params.id);
        //Delete image from cloudinary
        await cloudinary.uploader.destroy(user.cloudinary_id); //destroy takes the cloudinary public ID
        //Delete user from DB
        await user.remove()
        res.json(user);
    }catch (err){
        console.log(err);
    }
})

router.put("/:id",upload.single("image"),async (req,res)=>{
    try{
        let user=await User.findById(req.params.id);
        //first delete existing image
        await cloudinary.uploader.destroy(user.cloudinary_id);
        //then upload the new file
        const result=await cloudinary.uploader.upload(req.file.path);
        //then create a request body
        const data={
            name:req.body.name||user.name,  //if you provide a new name. otherwise it will use the name in the database
            avatar:result.secure_url||user.avatar,  //use new image if updated otherwise use the old one
            cloudinary_id:result.public_id||user.cloudinary_id,
        };

        user=await User.findByIdAndUpdate(req.params.id,data,{new:true});
        res.json(user);
    }catch(err){
        console.log(err)
    }
})

module.exports=router;