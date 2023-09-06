const mongoose=require("mongoose");
const farmSchema=new mongoose.Schema({
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
    },
    // owner:{
    //     type:Schema.Types.ObjectId,
    //     ref:"User"
    // }

})

module.exports=mongoose.model("Farm",farmSchema);