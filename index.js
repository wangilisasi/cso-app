const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

const app=express();

//Connect database
mongoose.connect(process.env.MONGO_URI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err))

//Middleware to parse request body
app.use(express.json());

//Route
app.use("/user",require("./routes/user"))









app.listen(process.env.PORT||5000,()=>console.log("Server started at port 5000"+process.env.PORT));