const express= require("express");
const app= express();
const cookieParser= require("cookie-parser");
app.use(cookieParser());
const cors = require('cors');
app.use(cors());


require("dotenv").config();

const PORT= process.env.PORT || 4000;
app.use(express.json());
const router= require("./routes/user");
app.use("/api/v1", router);

app.listen(PORT, ()=>{
    console.log(`I am listening at port ${PORT}`);
})

const {dbConnect}= require("./config/Database");
dbConnect();

app.get("/", (req,res)=>{
    res.send("HOME");
})