const express=require("express");
const mongoose=require("mongoose");
const routes=require("./routes/user")
const dotenv=require("dotenv");
dotenv.config();

const app=express();

app.use(express.static("public"));

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
app.use("/csos",routes)

app.get("/admin", function(req,res){
    res.sendFile(__dirname+"/index.html")
 })









app.listen(process.env.PORT||5000,()=>console.log("Server started at port 5000"+process.env.PORT));