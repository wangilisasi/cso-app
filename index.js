const dotenv=require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const csoRoute=require("./routes/cso");
const authRoute=require("./routes/auth");
//const bodyParser=require("body-parser")
const userRoute=require("./routes/user")
const cors=require("cors")

const app=express();

app.use(cors());
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
app.use(express.urlencoded());
//app.use(bodyParser.urlencoded({extended:true}))

//Route
app.use("/csos",csoRoute)
app.use("/auth",authRoute)
app.use("/user",userRoute)


app.get("/admin", function(req,res){
    res.sendFile(__dirname+"/index.html")
 })

 








app.listen(process.env.PORT||5000,()=>console.log("Server started at port "+process.env.PORT));