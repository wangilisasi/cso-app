const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
        email:{
            type:String,
            //unique: true, // Ensures that each email is unique
            //required:true,
        },
        password:{
            type:String
            // required:true
        },
        // farms:[{
        //     type:Schema.Types.ObjectId,
        //     ref:"Farm"
        // }]
        // name:{
        //     type:String
        // },
        // token:{
        //     type:String
        // }
         
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);

