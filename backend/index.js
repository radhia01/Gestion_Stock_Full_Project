const express=require("express")
const cors=require("cors")
const dotenv =require("dotenv")
const app=express()
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
       origin: ["http://localhost:5173","https://gestion-radhia-rahmani.vercel.app"],
       credentials:true
    }
))
dotenv.config()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("welcome to our API ")
})
const port=process.env.port||3001
app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})
app.use("/",require("./routes/auth"));
app.use("/",require("./routes/role"));
app.use("/",require("./routes/products"));
app.use("/",require("./routes/category"));
app.use("/",require("./routes/image"));
app.use("/",require("./routes/brand"));
app.use("/",require("./routes/user"));
app.use("/",require("./routes/permission"));