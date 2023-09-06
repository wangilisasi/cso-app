const router=require("express").Router();
const cloudinary=require("../utils/cloudinary");
const upload=require("../utils/multer");
const Farm=require("../model/farm")

router.post("/", upload.single("image"), async(req,res)=>{
    try{
        
        console.log(req.body.name)
        console.log(req.body.description)
        console.log(req.body.latitude)
        console.log(req.body.longitude)
        console.log(req.body.region)

        const result=await cloudinary.uploader.upload(req.file.path);

        //Create new farm
        let farm=new Farm({
            name:req.body.name,
            description:req.body.description,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            region:req.body.region,
            avatar:result.secure_url,
            cloudinary_id:result.public_id
        });
        //Save cso
        await farm.save();
        res.json(farm);
    }catch (err){
        console.log(err)
    }
})

router.get("/",async(req,res)=>{
    try{
        let farm=await Farm.find();
        res.json(farm)
        
    }catch (err){
        console.log(err);
    }
})


router.delete("/:id", async(req,res)=>{
    try{
        //Find cso by ID
        let farm=await Farm.findById(req.params.id);
        //Delete image from cloudinary
        await cloudinary.uploader.destroy(cso.cloudinary_id); //destroy takes the cloudinary public ID
        //Delete user from DB
        await farm.remove()
        res.json(farm);
    }catch (err){
        console.log(err);
    }
})

router.put("/:id",upload.single("image"),async (req,res)=>{
    try{
        let farm=await Farm.findById(req.params.id);
        //first delete existing image
        await cloudinary.uploader.destroy(cso.cloudinary_id);
        //then upload the new file
        const result=await cloudinary.uploader.upload(req.file.path);
        //then create a request body
        const data={
            name:req.body.name||farm.name,  //if you provide a new name. otherwise it will use the name in the database
            avatar:result.secure_url||user.avatar,  //use new image if updated otherwise use the old one
            cloudinary_id:result.public_id||farm.cloudinary_id,
        };

        cso=await Farm.findByIdAndUpdate(req.params.id,data,{new:true});
        res.json(farm);
    }catch(err){
        console.log(err)
    }
})

module.exports=router;