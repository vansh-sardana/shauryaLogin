const jwt= require("jsonwebtoken");
require("dotenv").config();


exports.auth= (req, res, next)=>{
    try{
        const token= req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                success: false, 
                message: "Token not found"
            });
        }
        try{
            const payload= jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user= payload;
            next();
        } catch(e){
            return res.status(401).json({
                success: false, 
                message: "Token is invalid",
                error: e.message
            })
        }
    } catch(e){
        return res.status(401).json({
            success: false, 
            message: "Something went wrong while verifying token"
        })
    }
}

exports.isStudent= (req, res, next)=>{
    try{
        if(req.user.role!=="Student"){
            return res.status(401).json({
                success: false, 
                message: "You are unauthorized to access the students page"
            })
        }
        next();
    }
    catch(e){
        return res.status(500).json({
            success: false, 
            message: "Something went wrong"
        })
    }
}

exports.isAdmin= (req, res, next)=>{
    try{
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success: false, 
                message: "You are unauthorized to access the admins page"
            })
        }
        next();
    }
    catch(e){
        return res.status(500).json({
            success: false, 
            message: "Something went wrong"
        })
    }
}