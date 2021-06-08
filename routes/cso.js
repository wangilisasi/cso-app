const router=require("express").Router();
const cloudinary=require("../utils/cloudinary");
const upload=require("../utils/multer");
const Cso=require("../model/cso")

router.post("/", upload.single("image"), async(req,res)=>{
    try{
        
        console.log(req.body.name)
        console.log(req.body.description)
        console.log(req.body.latitude)
        console.log(req.body.longitude)
        console.log(req.body.region)

        const result=await cloudinary.uploader.upload(req.file.path);

        //Create new cso
        let cso=new Cso({
            name:req.body.name,
            description:req.body.description,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            region:req.body.region,
            avatar:result.secure_url,
            cloudinary_id:result.public_id
        });
        //Save cso
        await cso.save();
        res.json(cso);
    }catch (err){
        console.log(err)
    }
})

router.get("/",async(req,res)=>{
    try{
        let cso=await Cso.find();
        res.json(cso)
        
    }catch (err){
        console.log(err);
    }
})


router.delete("/:id", async(req,res)=>{
    try{
        //Find cso by ID
        let cso=await Cso.findById(req.params.id);
        //Delete image from cloudinary
        await cloudinary.uploader.destroy(cso.cloudinary_id); //destroy takes the cloudinary public ID
        //Delete user from DB
        await cso.remove()
        res.json(cso);
    }catch (err){
        console.log(err);
    }
})

router.put("/:id",upload.single("image"),async (req,res)=>{
    try{
        let cso=await Cso.findById(req.params.id);
        //first delete existing image
        await cloudinary.uploader.destroy(cso.cloudinary_id);
        //then upload the new file
        const result=await cloudinary.uploader.upload(req.file.path);
        //then create a request body
        const data={
            name:req.body.name||cso.name,  //if you provide a new name. otherwise it will use the name in the database
            avatar:result.secure_url||user.avatar,  //use new image if updated otherwise use the old one
            cloudinary_id:result.public_id||cso.cloudinary_id,
        };

        cso=await Cso.findByIdAndUpdate(req.params.id,data,{new:true});
        res.json(cso);
    }catch(err){
        console.log(err)
    }
})

module.exports=router;