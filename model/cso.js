const mongoose=require("mongoose");
const csoSchema=new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    region:{
        type:String
    },
    avatar:{
        type:String
    },
    cloudinary_id:{
        type:String
    }

})

module.exports=mongoose.model("CSO",csoSchema);