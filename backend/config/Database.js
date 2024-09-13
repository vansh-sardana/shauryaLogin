const mongoose= require("mongoose");

require("dotenv").config();
const URL= process.env.MONGO_DB_URL;

exports.dbConnect = ()=>{
    
        mongoose.connect(URL).then(()=>{
            console.log("Connected to database");
        }).catch((e)=>{
            console.log("Error while connecting to database");
            console.error(e);
            process.exit(1);
        });
    
    
}