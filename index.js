const dotenv=require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const farmRoute=require("./routes/farm");
const authRoute=require("./routes/auth");
//const bodyParser=require("body-parser")
const userRoute=require("./routes/user")
const cors=require("cors")

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI1;

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

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
//   async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);


//Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded());
//app.use(bodyParser.urlencoded({extended:true}))

//Route
app.use("/farms",farmRoute)
app.use("/auth",authRoute)
app.use("/user",userRoute)


app.get("/admin", function(req,res){
    res.sendFile(__dirname+"/index.html")
 })

 








app.listen(process.env.PORT||5000,()=>console.log("Server started at port "+process.env.PORT));